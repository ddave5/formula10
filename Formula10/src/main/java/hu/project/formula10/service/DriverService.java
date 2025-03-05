package hu.project.formula10.service;

import hu.project.formula10.dto.DriverDTO;
import hu.project.formula10.model.Driver;
import hu.project.formula10.repository.DriverRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class DriverService {

    private final DriverRepository driverRepository;

    public DriverService(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    public List<DriverDTO> getAllDrivers() {
        log.info("Fetching all drivers");
        return driverRepository.findAll().stream()
                .map(Driver::toDTO).toList();
    }

    public DriverDTO getDriverById(Long id) {
        log.info("Fetching driver by id: {}", id);
        return driverRepository.findById(id).map(Driver::toDTO).orElse(null);
    }

}
