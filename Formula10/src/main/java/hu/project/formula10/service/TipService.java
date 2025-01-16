package hu.project.formula10.service;

import hu.project.formula10.dto.TipDTO;
import hu.project.formula10.model.Driver;
import hu.project.formula10.model.Race;
import hu.project.formula10.model.Tip;
import hu.project.formula10.model.User;
import hu.project.formula10.repository.DriverRepository;
import hu.project.formula10.repository.TipRepository;
import hu.project.formula10.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TipService {

    private final TipRepository tipRepository;
    private final UserRepository userRepository;
    private final DriverRepository driverRepository;

    public TipService(TipRepository tipRepository, UserRepository userRepository, DriverRepository driverRepository) {
        this.tipRepository = tipRepository;
        this.userRepository = userRepository;
        this.driverRepository = driverRepository;
    }

    public TipDTO createTip(TipDTO tipDTO, Long userId, Long raceId, Long driverId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Driver driver = driverRepository.findById(driverId).orElseThrow(() -> new RuntimeException("Driver not found"));
        Tip tip = new Tip();
        tip.setUser(user);
        tip.setRace(new Race());  //TODO: válaszd ki azt a versenyt, amely a következő.
        tip.setPredictedTenthPlaceDriver(driver);

        tipRepository.save(tip);
        return tip.toDTO();
    }

    public List<TipDTO> getTipsByUserId(Long userId) {
        return tipRepository.findByUserId(userId)
                .stream()
                .map(Tip::toDTO)
                .collect(Collectors.toList());
    }
}
