"use client";
import React, { useState } from "react";
import { api } from "../../../services/api";

interface LeadProps {
  id: 1;
  name: string;
  telefone: string;
  email: string;
}

const CadastroPage = () => {
  const [leadNameInput, setleadNameInput] = useState("");
  const [leadTelefoneInput, setleadTelefoneInput] = useState("");
  const [leadEmailInput, setleadEmailInput] = useState("");
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

  async function handleAddItem() {
    const data: Omit<LeadProps, "id"> = {
      name: leadNameInput,
      telefone: leadTelefoneInput,
      email: leadEmailInput,
    };
    try {
      await api.post("/leads", data);
      loadLeads();
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <section className="p-10 space-y-10">
      <h3 className="text-3xl font-bold dark:text-white">Cadastre de LEAD</h3>
      <form className="mx-auto">
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Nome Completo
          </label>

          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Digite seu nome"
            onChange={(e) => setleadNameInput(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="name@flowbite.com"
            onChange={(e) => setleadEmailInput(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Telefone
          </label>
          <input
            type="telefone"
            id="telefone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="(81)9944-2211"
            onChange={(e) => setleadTelefoneInput(e.target.value)}
            required
          />
        </div>

        <button
          onClick={handleAddItem}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center /"
        >
          Submit
        </button>
        
      </form>
    </section>
  );
};

export default CadastroPage;
