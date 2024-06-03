package com.example;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class FlagRepository implements PanacheRepository<Flag> {
}
