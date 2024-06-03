package com.example;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.ArrayList;

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
    public Response createFlag(FlagRequest flagRequest) {
        Flag flag = new Flag();
        if (flagRequest.projectId != null) {
            Project project = projectRepository.findById(flagRequest.projectId);
            flag.setProject(project);
        }
        flag.setName(flagRequest.name);
        flag.setEnabled(flagRequest.enabled);
        flag.setSecondaryKey(flagRequest.secondaryKey);
        flagRepository.persist(flag);
        return Response.status(Response.Status.CREATED).entity(flag).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Flag updateFlag(@PathParam("id") Long id, FlagRequest flagRequest) {
        Flag existingFlag = flagRepository.findById(id);
        existingFlag.setName(flagRequest.name);
        existingFlag.setEnabled(flagRequest.enabled);
        existingFlag.setSecondaryKey(flagRequest.secondaryKey);
        if (flagRequest.projectId != null) {
            Project project = projectRepository.findById(flagRequest.projectId);
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

    @GET
    @Path("/project/{projectId}/flag")
    public Response getFlagByName(@PathParam("projectId") Long projectId, @QueryParam("name") String name, @QueryParam("secondaryKey") String secondaryKey) {

        List<Flag> flags = new ArrayList<Flag>();
        if (secondaryKey != null) {
            flags = flagRepository.list("project.id = ?1 and name = ?2 and secondaryKey = ?3", projectId, name, secondaryKey);
        }
        if (flags.isEmpty()) {
            flags = flagRepository.list("project.id = ?1 and name = ?2 and secondaryKey is null", projectId, name, secondaryKey);
        }
        if (flags.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(flags.get(0)).build();
    }
}
