import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Row, Select } from "antd";
import WorkerList from "../components/WorkerList";

const { Option } = Select;

const HomePage = () => {
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");

  const getUserData = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllWorkers", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setWorkers(res.data.data);
        setFilteredWorkers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleLocationChange = (value) => {
    setSelectedLocation(value);
    filterWorkers(value, selectedSpecialization);
  };

  const handleSpecializationChange = (value) => {
    setSelectedSpecialization(value);
    filterWorkers(selectedLocation, value);
  };

  const filterWorkers = (location, specialization) => {
    let filtered = workers;

    if (location !== "all") {
      filtered = workers.filter((worker) => worker.address === location);
    }

    if (specialization !== "all") {
      filtered = filtered.filter(
        (worker) => worker.specialization === specialization
      );
    }

    setFilteredWorkers(filtered);
  };

  return (
    <Layout>
      <h1 className="text-center">Home Page</h1>
      <a href="http://127.0.0.1:5500/#">
        <button className="btn btn-primary m-2">ChatBot</button>
      </a>
      <Select
        value={selectedLocation}
        style={{ width: 200, marginBottom: 20 }}
        onChange={handleLocationChange}
      >
        <Option value="all">All Locations</Option>
        {Array.from(new Set(workers.map((worker) => worker.address))).map(
          (location) => (
            <Option key={location} value={location}>
              {location}
            </Option>
          )
        )}
      </Select>
      <Select
        value={selectedSpecialization}
        style={{ width: 200, marginBottom: 20 }}
        onChange={handleSpecializationChange}
      >
        <Option value="all">All Specializations</Option>
        {Array.from(
          new Set(workers.map((worker) => worker.specialization))
        ).map((specialization) => (
          <Option key={specialization} value={specialization}>
            {specialization}
          </Option>
        ))}
      </Select>
      <Row>
        {filteredWorkers.map((worker) => (
          <WorkerList key={worker._id} worker={worker} />
        ))}
      </Row>
    </Layout>
  );
};

export default HomePage;
