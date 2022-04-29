import React, { useState, useEffect } from "react";
import "./listItem.css";
import { Table } from "antd";
import axios from "axios";
import { Button, Input } from "antd";
import RegistrationForm from "./RegistrationForm";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Location",
    dataIndex: "location",
  },
  {
    title: "Money",
    dataIndex: "money",
    sorter: {
      compare: (a, b) => a.money - b.money,
      multiple: 2,
    },
  },
  {
    title: "Saving",
    dataIndex: "saving",
    sorter: {
      compare: (a, b) => a.saving - b.saving,
      multiple: 1,
    },
  },
];

const ListItem = () => {
  const [data, setData] = useState([]);
  const [check, setCheck] = useState(false);
  const [isRegistered, setRegistered] = useState(false);
  const [deleteName, setDeleteName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const getAPIasd = () => {
    setCheck(!check);
  };

  useEffect(() => {
    axios
      .get("https://personsaving.herokuapp.com/table")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, [check]);
  const handleDeletePerson = () => {
    const domain = "https://personsaving.herokuapp.com/table" + deleteName;
    axios
      .delete(domain)
      .then((response) => {
        console.log(response);
        setCheck(!check);
      })
      .catch((err) => console.log(err));
  };
  const searchData = data.filter((val) => {
    if (searchTerm == "") {
      return val;
    } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val;
    }
  });
  return (
    <div className="tableContainer">
      <Input
        style={{ width: "200px", float: "right" }}
        type="text"
        placeholder="Search by name"
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <Table
        pagination={{ pageSize: 5 }}
        size="large"
        columns={columns}
        dataSource={searchData}
      />
      <br />
      <div className="buttonContainer">
        <div className="upper">
          <Button style={{ width: "150px" }} type="primary" onClick={getAPIasd}>
            Refresh Table
          </Button>
          <div style={{ width: "50px" }}></div>
          <Button
            style={{ width: "150px" }}
            type="primary"
            onClick={() => setRegistered(true)}
          >
            Add Person
          </Button>
        </div>
        <br />
        <div className="lower">
          <Input
            style={{ width: "200px" }}
            type="text"
            onChange={(e) => setDeleteName(e.target.value)}
          />

          <Button
            style={{ width: "150px" }}
            type="primary"
            onClick={handleDeletePerson}
            danger
          >
            Delete Person
          </Button>
        </div>
      </div>
      <RegistrationForm visible={isRegistered} setVisible={setRegistered} />
    </div>
  );
};

export default ListItem;
