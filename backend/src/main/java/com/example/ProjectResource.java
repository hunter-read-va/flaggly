package com.example;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/projects")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProjectResource {

    @Inject
    ProjectRepository projectRepository;

    @GET
    public List<Project> getAllProjects() {
        return projectRepository.listAll();
    }

    @GET
    @Path("/{id}")
    public Project getProject(@PathParam("id") Long id) {
        return projectRepository.findById(id);
    }

    @POST
    @Transactional
    public Response createProject(Project project) {
        projectRepository.persist(project);
        return Response.status(Response.Status.CREATED).entity(project).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Project updateProject(@PathParam("id") Long id, Project project) {
        Project existingProject = projectRepository.findById(id);
        existingProject.setName(project.getName());
        return existingProject;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteProject(@PathParam("id") Long id) {
        projectRepository.deleteById(id);
        return Response.status(Response.Status.NO_CONTENT).build();
    }
}