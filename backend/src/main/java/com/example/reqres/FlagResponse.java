package com.example;

public class FlagResponse {
    public Long id;
    public String name;
    public boolean enabled;
    public String secondaryKey;
    public Long projectId;

    public FlagResponse(Long id, String name, boolean enabled, String secondaryKey, Long projectId) {
        this.id = id;
        this.name = name;
        this.enabled = enabled;
        this.secondaryKey = secondaryKey;
        this.projectId = projectId;
    }

    public FlagResponse(Flag flag) {
        this.id = flag.getId();
        this.name = flag.getName();
        this.enabled = flag.isEnabled();
        this.secondaryKey = flag.getSecondaryKey();
        this.projectId = flag.getProject().getId();
    }
}
