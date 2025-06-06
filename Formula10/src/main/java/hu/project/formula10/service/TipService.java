package hu.project.formula10.service;

import hu.project.formula10.dto.TipDTO;
import hu.project.formula10.enums.TipType;
import hu.project.formula10.exception.RaceClosedException;
import hu.project.formula10.model.*;
import hu.project.formula10.repository.*;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
public class TipService {

    private final TipRepository tipRepository;
    private final UserRepository userRepository;
    private final DriverRepository driverRepository;
    private final RaceRepository raceRepository;
    private final GroupRepository groupRepository;
    private final SeasonRepository seasonRepository;
    private final GroupMemberRepository groupMemberRepository;

    public TipService(
            TipRepository tipRepository,
            UserRepository userRepository,
            DriverRepository driverRepository,
            RaceRepository raceRepository,
            GroupRepository groupRepository, 
            SeasonRepository seasonRepository, 
            GroupMemberRepository groupMemberRepository) {
        this.tipRepository = tipRepository;
        this.userRepository = userRepository;
        this.driverRepository = driverRepository;
        this.raceRepository = raceRepository;
        this.groupRepository = groupRepository;
        this.seasonRepository = seasonRepository;
        this.groupMemberRepository = groupMemberRepository;
    }

    public TipDTO createTip(TipDTO tipDTO) {

        try {
            validateTipTimeWindow(tipDTO);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        log.info("Fetching user with id: {}", tipDTO.getUserId());
        User user = userRepository.findById(tipDTO.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        log.info("Fetching group with id: {}", tipDTO.getGroupId());
        Group group = groupRepository.findById(tipDTO.getGroupId()).orElseThrow(() -> new RuntimeException("Group not found"));
        log.info("Fetching season with id: {}", tipDTO.getSeasonId());
        Season season = seasonRepository.findById(tipDTO.getSeasonId()).orElseThrow(() -> new RuntimeException("Season not found"));
        log.info("Fetching race with id: {}", tipDTO.getRaceId());
        Race race = raceRepository.findById(tipDTO.getRaceId()).orElseThrow(() -> new RuntimeException("Race not found"));
        log.info("Fetching driver with id: {}", tipDTO.getDriverId());
        Driver driver = driverRepository.findById(tipDTO.getDriverId()).orElseThrow(() -> new RuntimeException("Driver not found"));

        log.info("Create a tip");
        Tip tip = new Tip();
        tip.setUser(user);
        tip.setGroup(group);
        tip.setSeason(season);
        tip.setRace(race);
        tip.setPredictedDriver(driver);
        tip.setCreatedAt(LocalDateTime.now());
        tip.setTipType(tipDTO.getTipType().equals("RACE") ? TipType.RACE : TipType.SPRINT);

        return tipRepository.save(tip).toDTO();
    }

    public List<TipDTO> getTipsForGroupSeasonAndRace(Long groupId, Long seasonId, Long raceId) {
        List <Tip> tips = tipRepository.findByGroupIdAndSeasonIdAndRaceId(groupId, seasonId, raceId);

        return tips.stream().map(Tip::toDTO).collect(Collectors.toList());
    }

    public List<TipDTO> getUserTips(Long userId, Long groupId, Long seasonId, Long raceId) {
        List<Tip> tips = tipRepository.findAllByGroupIdAndSeasonIdAndRaceIdAndUserId(userId, groupId, seasonId, raceId);

        return tips.stream().map(Tip::toDTO).collect(Collectors.toList());
    }

    @Transactional
    public TipDTO updateTip(TipDTO tipDTO) throws SQLException{
        validateTipTimeWindow(tipDTO);

        Tip existingTip = tipRepository.findById(tipDTO.getId()).orElseThrow(() -> new RuntimeException("Tip not found"));
        log.info("Fetching driver with id: {}", tipDTO.getDriverId());
        Driver driver = driverRepository.findById(tipDTO.getDriverId()).orElseThrow(() -> new RuntimeException("Driver not found"));
        
        existingTip.setPredictedDriver(driver);


        return tipRepository.save(existingTip).toDTO();
    }

    public void deleteTip(Long id) {
        tipRepository.deleteById(id);
    }

    public Map<String, Boolean> getTipsFromGroup(Long groupId) {
        Race race = raceRepository.findNextRace().orElseThrow(() -> new RuntimeException("Race not found"));
        List<Tip> tips = tipRepository.findByGroupIdAndSeasonIdAndRaceId(groupId, race.getSeason().getId(), race.getId());
        List<GroupMember> groupMembers = groupMemberRepository.findByGroup(groupRepository.findById(groupId).orElseThrow(() -> new RuntimeException("Group not found")));

        return groupMembers.stream().map(groupMember -> {
            boolean hasTip = tips.stream().anyMatch(tip -> tip.getUser().getId().equals(groupMember.getUser().getId()));
            return Map.entry(groupMember.getUser().getUsername(), hasTip);
        }).collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }


    private void validateTipTimeWindow(TipDTO TipDTO) throws SQLException {
        Race race = raceRepository.findById(TipDTO.getRaceId())
                              .orElseThrow(() -> new SQLException("Race not found"));

        ZonedDateTime now = ZonedDateTime.now();

        if (race.getSprintQualifyingStart() == null && race.getSprintRaceStart() == null) {
            if (now.isAfter(race.getQualifyingStart()) && now.isBefore(race.getRaceStart().plusHours(4))) {
                throw new RaceClosedException("Tips are closed for this race.");
            }
        } else {
            if (now.isAfter(race.getSprintQualifyingStart()) && now.isBefore(race.getRaceStart().plusHours(4))) {
                throw new RaceClosedException("Tips are closed for this race.");
            }
        }
    }
    
}
