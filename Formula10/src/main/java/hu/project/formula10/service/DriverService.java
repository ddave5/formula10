package hu.project.formula10.service;

import hu.project.formula10.dto.DriverDTO;
import hu.project.formula10.model.Driver;
import hu.project.formula10.repository.DriverRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverService {

    private final DriverRepository driverRepository;

    public DriverService(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    public List<DriverDTO> getAllDrivers() {
        return driverRepository.findAll().stream()
                .map(Driver::toDTO).toList();
    }

    public DriverDTO getDriverById(Long id) {
        return driverRepository.findById(id).map(Driver::toDTO).orElse(null);
    }

    public DriverDTO createDriver(DriverDTO driverDTO) {
        Driver driver = new Driver();
        driver.setName(driverDTO.getName());
        driverRepository.save(driver);
        return driver.toDTO();
    }

    public void deleteDriver(Long id) {
        driverRepository.deleteById(id);
    }
}
