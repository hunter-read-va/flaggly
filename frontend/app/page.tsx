import ProjectList from "@/components/ProjectList";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Project Management</h1>
    <ProjectList />
  </div>
  );
}
