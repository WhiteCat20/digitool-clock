/* eslint-disable no-unused-vars */
import { useState } from "react";
import logopertamina from "../assets/Logo-Pertamina-resize-2-1.png";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [nama, setNama] = useState([]);
  const [area, setArea] = useState([]);

  const navigate = useNavigate();

  const handleNama = (e) => {
    setNama(e.target.value);
    console.log(nama);
  };

  const handleArea = (e) => {
    setArea(e.target.value);
    console.log(area);
  };

  const handleButton = () => {
    localStorage.setItem("nama", JSON.stringify(nama));
    localStorage.setItem("area", JSON.stringify(area));
    navigate("/capture");
  };
  return (
    <>
      <div className="text-xl  flex justify-center">
        <div className="w-[80%]">
          <div className="flex justify-center my-[2rem]">
            <img src={logopertamina} alt="logo pertamina" width="150px" />
          </div>
          <h1 className="text-center">
            Selamat Datang di Digitool Clock Pertamina
          </h1>
          <input
            type="text"
            id="first_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 mt-[1rem]"
            placeholder="Masukan nama anda disini"
            required
            onChange={handleNama}
          />{" "}
          <select
            id="countries"
            onChange={handleArea}
            class="mt-[1rem] bg-gray-50 border border-gray-300 text-gray text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 "
          >
            <option selected>Masukan area pekerjaan anda</option>
            <option value="Area 10">Area 10</option>
            <option value="Area 20">Area 20</option>
            <option value="Area 30">Area 30</option>
            <option value="Area 40">Area 40</option>
          </select>
          <button
            onClick={handleButton}
            type="button"
            class="mt-5 w-[100%] focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Masuk
          </button>
        </div>
      </div>
    </>
  );
};
