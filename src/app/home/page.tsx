"use client";

import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { Skeleton } from "@nextui-org/react";

interface LeadProps {
  id: 1;
  name: string;
  telefone: string;
  email: string;
  isEditing: boolean;
}

const HomePage = () => {
  const [leads, setLeads] = useState([] as LeadProps[]);
  const [loading, setloading] = useState(false);

  async function loadLeads() {
    setloading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const response = await api.get("/leads");
      setLeads(response.data);
      console.log("Success:", response);
    } catch (error) {
      console.log("Error:", error);
      alert("Ocorreu um erro ao tentar se conectar com o servidor.");
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    loadLeads();
  }, []);

  async function handleDeleteItem(leadId: number) {
    console.log(leadId);

    try {
      await api.delete(`/leads/${leadId}`);

      const filteredLeads = leads.filter((lead) => lead.id !== leadId);
      setLeads(filteredLeads);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async function handleEditItem(leadId: number) {
    let leadItem: any;

    const result = leads.map((lead) => {
      if (lead.id === leadId) {
        const updatedItem = { ...lead, isEditing: !lead.isEditing };
        leadItem = updatedItem;

        return updatedItem;
      }
      return lead;
    });

    setLeads(result);
    if (!leadItem.isEditing) await api.put(`/leads/${leadId}`, leadItem);
  }

  function handleChangeLead(
    leadId: number,
    nameValue: string,
    telefoneValue: string,
    emailValue: string
  ) {
    const result = leads.map((lead) => {
      if (lead.id === leadId) {
        return {
          ...lead,
          name: nameValue,
          telefone: telefoneValue,
          email: emailValue,
        };
      }
      return lead;
    });

    setLeads(result);
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg text-center border space-y-10 p-4">
        <h3 className="text-3xl font-bold  border-solid border-b-1">
          Leads Cadastrados
        </h3>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead>
            <tr>
              <th>NOME</th>
              <th>TELEFONE</th>
              <th>EMAIL</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5}>
                  <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                  </div>
                </td>
              </tr>
            )}
            {leads.map((lead) => (
              <tr key={lead.id} className="bg-white border-b">
                <td className="font-medium text-gray-900 whitespace-nowrap w-40 py-4">
                  {lead.isEditing ? (
                    <input
                      type="text"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Digite seu nome"
                      value={lead.name}
                      onChange={(e) =>
                        handleChangeLead(
                          lead.id,
                          e.target.value,
                          lead.telefone,
                          lead.email
                        )
                      }
                      required
                    />
                  ) : (
                    lead.name
                  )}
                </td>
                <td className="w-40 py-4">
                  {lead.isEditing ? (
                    <input
                      type="text"
                      id="telefone"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Digite seu Telefone"
                      value={lead.telefone}
                      onChange={(e) =>
                        handleChangeLead(
                          lead.id,
                          lead.name,
                          e.target.value,
                          lead.email
                        )
                      }
                      required
                    />
                  ) : (
                    lead.telefone
                  )}
                </td>
                <td className="w-40 py-4">
                  {lead.isEditing ? (
                    <input
                      type="text"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Digite seu Email"
                      value={lead.email}
                      onChange={(e) =>
                        handleChangeLead(
                          lead.id,
                          lead.name,
                          lead.telefone,
                          e.target.value
                        )
                      }
                      required
                    />
                  ) : (
                    lead.email
                  )}
                </td>
                <td className="w-28 py-4">
                  <a
                    onClick={() => handleEditItem(lead.id)}
                    href="#"
                    className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    {lead.isEditing ? "Salvar" : "Editar"}
                  </a>
                </td>
                <td className="w-28 py-4">
                  <a
                    onClick={() => handleDeleteItem(lead.id)}
                    href="#"
                    className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Deletar
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HomePage;
