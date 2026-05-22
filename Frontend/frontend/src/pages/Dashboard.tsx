import React, {
  useEffect,
  useState,
} from "react";

import api from "../api";

interface DashboardProps {
  setIsLoggedIn: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

interface Lead {
  _id?: string;
  name: string;
  email: string;
  company: string;
  source: string;
  status: string;
}

function Dashboard({
  setIsLoggedIn,
}: DashboardProps) {
  const [leads, setLeads] =
    useState<Lead[]>([]);

  const [formData, setFormData] =
    useState<Lead>({
      name: "",
      email: "",
      company: "",
      source: "",
      status: "New",
    });

  const [editingId, setEditingId] =
    useState<string | null>(null);

  // Fetch Leads
  const fetchLeads = async () => {
    try {
      const response = await api.get(
        "/leads"
      );

      setLeads(response.data);
    } catch (error) {
      console.log(error);

      alert("Failed to fetch leads");
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // Create OR Update Lead
  const handleSubmit = async () => {
    try {
      if (
        !formData.name ||
        !formData.email ||
        !formData.company ||
        !formData.source
      ) {
        alert("Fill all fields");

        return;
      }

      // UPDATE
      if (editingId) {
        await api.put(
          `/leads/${editingId}`,
          formData
        );

        alert("Lead Updated");

        setEditingId(null);
      }

      // CREATE
      else {
        await api.post(
          "/leads",
          formData
        );

        alert("Lead Created");
      }

      // Reset Form
      setFormData({
        name: "",
        email: "",
        company: "",
        source: "",
        status: "New",
      });

      fetchLeads();
    } catch (error) {
      console.log(error);

      alert(
        "Error creating/updating lead"
      );
    }
  };

  // Delete Lead
  const deleteLead = async (
    id: string
  ) => {
    try {
      await api.delete(
        `/leads/${id}`
      );
      setLeads(leads.filter((lead) => lead._id !== id));
      
      alert("Lead Deleted successfully");

      fetchLeads();
    } catch (error) {
      console.log(error);

      alert("Delete failed");
    }
  };

  // Edit Lead
  const editLead = (lead: Lead) => {
    setFormData({
      name: lead.name,
      email: lead.email,
      company: lead.company,
      source: lead.source,
      status: lead.status,
    });

    setEditingId(
      lead._id || null
    );
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);
    
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-cyan-400">
            Smart Leads Dashboard
          </h1>

          <p className="text-gray-300 mt-2">
            Manage Leads Efficiently
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded"
        >
          Logout
        </button>

      </div>

      {/* FORM */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-10">

        <h2 className="text-2xl font-semibold mb-6">

          {editingId
            ? "Update Lead"
            : "Create Lead"}

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            name="name"
            placeholder="Lead Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded bg-gray-700 border border-gray-600 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Lead Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded bg-gray-700 border border-gray-600 outline-none"
          />

          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            className="p-3 rounded bg-gray-700 border border-gray-600 outline-none"
          />

          <input
            type="text"
            name="source"
            placeholder="Source"
            value={formData.source}
            onChange={handleChange}
            className="p-3 rounded bg-gray-700 border border-gray-600 outline-none"
          />

        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded font-bold"
        >

          {editingId
            ? "Update Lead"
            : "Create Lead"}

        </button>

      </div>

      {/* LEADS TABLE */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">

        <h2 className="text-2xl font-semibold mb-6">
          All Leads
        </h2>

        {leads.length === 0 ? (
          <p className="text-gray-400">
            No Leads Found
          </p>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-gray-700">

                  <th className="p-3 border">
                    Name
                  </th>

                  <th className="p-3 border">
                    Email
                  </th>

                  <th className="p-3 border">
                    Company
                  </th>

                  <th className="p-3 border">
                    Source
                  </th>

                  <th className="p-3 border">
                    Status
                  </th>

                  <th className="p-3 border">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {leads.map((lead) => (
                  <tr
                    key={lead._id}
                    className="text-center"
                  >

                    <td className="p-3 border">
                      {lead.name}
                    </td>

                    <td className="p-3 border">
                      {lead.email}
                    </td>

                    <td className="p-3 border">
                      {lead.company}
                    </td>

                    <td className="p-3 border">
                      {lead.source}
                    </td>

                    <td className="p-3 border">
                      {lead.status}
                    </td>

                    <td className="p-3 border">

                      <div className="flex justify-center gap-3">

                        <button
                          onClick={() =>
                            editLead(lead)
                          }
                          className="bg-yellow-500 hover:bg-yellow-600 px-4 py-1 rounded"
                        >
                          Update
                        </button>

                        <button
                          onClick={() =>
                            deleteLead(
                              lead._id || ""
                            )
                          }
                          className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

export default Dashboard;