import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Row } from "antd";
import WorkerList from "../components/WorkerList";
const HomePage = () => {
  const [workers, setWorkers] = useState([]);
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "/api/v1/user/getAllWorkers",

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setWorkers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <h1 className="text-center">Home Page</h1>
      <a href="http://127.0.0.1:5500/#"><button className="btn btn-primary">ChatBot</button></a>
      <Row>
        {workers && workers.map((worker) => <WorkerList worker={worker} />)}
      </Row>
    </Layout>
  );
};

export default HomePage;
