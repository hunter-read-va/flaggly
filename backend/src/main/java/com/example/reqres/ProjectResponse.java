package com.example;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ProjectResponse {
    public Long id;
    public String name;
    public List<FlagResponse> flags = new ArrayList<FlagResponse>();

    public ProjectResponse(Long id, String name, List<FlagResponse> flags) {
        this.id = id;
        this.name = name;
        this.flags = flags;
    }

    public ProjectResponse(Project project) {
        this.id = project.getId();
        this.name = project.getName();
        if (project.getFlags() != null) {
            this.flags = project.getFlags().stream().map(FlagResponse::new).collect(Collectors.toList());
        }
    }
}
