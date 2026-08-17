import React from "react";
import Button from "./Button";
import { Card, CardHeader, CardContent } from "./Card";
import Badge from "./Badge";
import Input from "./Input";
import Table from "./Table";
import EmptyState from "./EmptyState";

export default function Task3Preview() {
  const tableHeaders = ["Project Name", "Status", "Date", "Role"];
  const tableData = [
    {
      name: "Frontend Setup",
      status: <Badge variant="success">Completed</Badge>,
      date: "Aug 16",
      role: "Developer",
    },
    {
      name: "Design System",
      status: <Badge variant="brand">In Progress</Badge>,
      date: "Aug 17",
      role: "UI Engineer",
    },
    {
      name: "API Integration",
      status: <Badge variant="warning">Pending</Badge>,
      date: "Aug 18",
      role: "Backend",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8 pb-10">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            UI Component Library
          </h1>
          <p className="text-slate-400 mt-1">
            Day 6 Task 3: Consistent variants for buttons, cards, badges,
            inputs, tables, and empty states.
          </p>
        </div>

        {/* Buttons & Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader
              title="Button Variants"
              description="Consistent action triggers across the application."
            />
            <CardContent className="flex flex-wrap gap-4">
              <Button variant="primary">Primary Action</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              title="Badge Variants"
              description="Status indicators and labels."
            />
            <CardContent className="flex flex-wrap gap-4 items-center">
              <Badge variant="brand">Brand Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="neutral">Neutral</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Inputs */}
        <Card>
          <CardHeader
            title="Form Inputs"
            description="Clean input fields for user data collection."
          />
          <CardContent>
            <div className="max-w-md space-y-4">
              <Input
                label="Email Address"
                id="email"
                type="email"
                placeholder="attique@example.com"
              />
              <Input
                label="Project Name"
                id="project"
                type="text"
                placeholder="Enter project name..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Table View */}
        <Card>
          <CardHeader
            title="Data Table"
            description="Responsive table layout for structured data presentation."
          />
          <CardContent className="p-0">
            <Table headers={tableHeaders} data={tableData} />
          </CardContent>
        </Card>

        {/* Empty State */}
        <Card>
          <CardHeader
            title="Empty State Component"
            description="Feedback placeholder when no records are available."
          />
          <CardContent>
            <EmptyState
              title="No projects found"
              description="Get started by creating a new project with your fresh design system components."
              action={<Button variant="primary">Create Project</Button>}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
