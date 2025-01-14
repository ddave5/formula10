package hu.project.formula10.controller;

import hu.project.formula10.model.Season;
import hu.project.formula10.service.SeasonService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seasons")
public class SeasonController {

    private final SeasonService seasonService;

    public SeasonController(SeasonService seasonService) {
        this.seasonService = seasonService;
    }

    @PostMapping
    public Season createSeason(@RequestBody Season season) {
        return seasonService.createSeason(season);
    }

    @PostMapping("/{id}/archive")
    public Season archiveSeason(@PathVariable Long id) {
        return seasonService.archiveSeason(id);
    }

    @GetMapping("/group/{groupId}")
    public List<Season> getSeasonsByGroupId(@PathVariable Long groupId) {
        return seasonService.getSeasonsByGroupId(groupId);
    }
}
