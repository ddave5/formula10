package hu.project.formula10.service;

import hu.project.formula10.dto.TipDTO;
import hu.project.formula10.model.*;
import hu.project.formula10.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
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

    public TipService(
            TipRepository tipRepository,
            UserRepository userRepository,
            DriverRepository driverRepository,
            RaceRepository raceRepository,
            GroupRepository groupRepository, SeasonRepository seasonRepository) {
        this.tipRepository = tipRepository;
        this.userRepository = userRepository;
        this.driverRepository = driverRepository;
        this.raceRepository = raceRepository;
        this.groupRepository = groupRepository;
        this.seasonRepository = seasonRepository;
    }

    public TipDTO createTip(TipDTO tipDTO) {
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
        tip.setPredictedTenthPlaceDriver(driver);
        tip.setCreatedAt(LocalDateTime.now());

        tipRepository.save(tip);

        return new TipDTO(tip.getId(), user.getId(), group.getId(), season.getId(), race.getId(), driver.getId());
    }

    public List<TipDTO> getTipsForUserAndRace(Long userId, Long raceId) {
        log.info("Fetching user with id: {}", userId);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        log.info("Fetching race with id: {}", raceId);
        Race race = raceRepository.findById(raceId).orElseThrow(() -> new RuntimeException("Race not found"));
        List<Tip> tips = tipRepository.findByUserAndRace(user, race);

        return tips.stream().map(tip -> new TipDTO(
                        tip.getId(), tip.getUser().getId(), tip.getGroup().getId(),
                        tip.getSeason().getId(), tip.getRace().getId(), tip.getPredictedTenthPlaceDriver().getId()))
                .collect(Collectors.toList());
    }
}
