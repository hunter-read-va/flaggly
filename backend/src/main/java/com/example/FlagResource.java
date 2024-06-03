package com.example;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/flags")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class FlagResource {

    @Inject
    FlagRepository flagRepository;

    @Inject
    ProjectRepository projectRepository;

    @GET
    public List<Flag> getAllFlags() {
        return flagRepository.listAll();
    }

    @GET
    @Path("/{id}")
    public Flag getFlag(@PathParam("id") Long id) {
        return flagRepository.findById(id);
    }

    @POST
    @Transactional
    public Response createFlag(Flag flag) {
        if (flag.getProject() != null && flag.getProject().getId() != null) {
            Project project = projectRepository.findById(flag.getProject().getId());
            flag.setProject(project);
        }
        flagRepository.persist(flag);
        return Response.status(Response.Status.CREATED).entity(flag).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Flag updateFlag(@PathParam("id") Long id, Flag flag) {
        Flag existingFlag = flagRepository.findById(id);
        existingFlag.setName(flag.getName());
        existingFlag.setEnabled(flag.isEnabled());
        if (flag.getProject() != null && flag.getProject().getId() != null) {
            Project project = projectRepository.findById(flag.getProject().getId());
            existingFlag.setProject(project);
        }
        return existingFlag;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteFlag(@PathParam("id") Long id) {
        flagRepository.deleteById(id);
        return Response.status(Response.Status.NO_CONTENT).build();
    }
}
