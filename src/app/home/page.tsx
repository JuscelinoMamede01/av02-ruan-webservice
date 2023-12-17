"use client";

import { useEffect, useState } from "react";
import { api } from "../../../services/api";

interface LeadProps {
  id: 1;
  name: string;
  telefone: string;
  email: string;
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

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg text-center border space-y-10 p-4">
        <h3 className="text-3xl font-bold  border-solid border-b-1">
          Leads Cadastrados
        </h3>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <tbody>
            <ul>
              {leads.map((lead) => (
                <li key={lead.id}>
                  <tr className="bg-white border-b ">
                    <th
                      scope="row"
                      className=" font-medium text-gray-900 whitespace-nowrap w-40 py-4"
                    >
                      {lead.name}
                    </th>
                    <td className="w-40 py-4">{lead.telefone}</td>
                    <td className=" w-40 py-4">{lead.email}</td>
                    <td className="w-28 py-4">
                      <a
                        href="#"
                        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                      >
                        Editar
                      </a>
                    </td>
                    <td className="w-28 py-4 ">
                      <a
                        href="#"
                        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                </li>
              ))}
            </ul>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HomePage;
