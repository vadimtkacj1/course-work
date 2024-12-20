import { useEffect, useState } from "react";
import { Table, Popconfirm, Button, Input, Space } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import EditVehicleRegistration from "./components/EditVehicleRegistration/EditVehicleRegistration";
import AddVehicleRegistration from "./components/AddVehicleRegistration/AddVehicleRegistration";
import styles from "./styles.module.css";

const VehicleRegistration = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [cars, setCars] = useState([]);
  const [bodyTypes, setBodyTypes] = useState([]);
  const [engineTypes, setEngineTypes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  

  useEffect(() => {
    fetch("http://localhost:8080/api/cars/")
      .then(response => response.json())
      .then(response => {
        let data = JSON.parse(response.data)
        data = data.map((elem) => ({...elem, key: elem.id}))
        setCars(data)
      })

    fetch("http://localhost:8080/api/engine_types/")
      .then(response => response.json())
      .then(response => {
        let data = JSON.parse(response.data)
        data = data.map((elem) => ({...elem, key: elem.id}))
        setEngineTypes(data)
      })

    fetch("http://localhost:8080/api/body_types/")
      .then(response => response.json())
      .then(response => {
        let data = JSON.parse(response.data)
        data = data.map((elem) => ({...elem, key: elem.id}))
        setBodyTypes(data)
      })
  }, [])

  const showEditModal = (id) => {
    setSelectedCarId(id);
  };

  const showAddModal = () => {
    setIsAddModalOpen(true)
  }

  const handleEditModelOk = (car) => {
    setSelectedCarId(null);
    setCars(cars.map((elem) => {
      if (car.id === elem.id) {
        return car
      }

      return elem
    }))
  };

  const handleAddModelOk = (car) => {
    setCars([...cars, car])
    setIsAddModalOpen(false)
  }

  const handleEditModalCancel = () => {
    setSelectedCarId(null);
  };

  const handleAddModalCancel = () => {
    setIsAddModalOpen(false)
  }

  const handleEdit = (id) => {
    showEditModal(id)
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/cars/${id}/`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(() => {
        setCars(cars.filter((elem) => elem.id != id))
      })
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon="search"
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <i className="anticon anticon-search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
    render: text => text ? text : '-'
  });

  const columns = [
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
      sorter: (a, b) => a.count - b.count,
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: 'Body type',
      dataIndex: 'body_type',
      key: 'body_type',
      filters: bodyTypes.map(type => ({ text: type.type_name, value: type.type_name })),
      onFilter: (value, record) => record.body_type.includes(value),
    },
    {
      title: 'Engine type',
      dataIndex: 'engine_type',
      key: 'engine_type',
      filters: engineTypes.map(type => ({ text: type.type_name, value: type.type_name })),
      onFilter: (value, record) => record.engine_type.includes(value),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => handleEdit(record.id)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this record?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const isEditModalOpen = Boolean(selectedCarId)
  let car = cars.find((elem) => elem.id === selectedCarId)

  return (
    <div style={{width: "100%"}}>
      <div style={{fontSize: 36}}>Cars</div>
      {isAddModalOpen && <AddVehicleRegistration isModalOpen={isAddModalOpen} handleCancel={handleAddModalCancel} handleOk={handleAddModelOk} bodyTypes={bodyTypes} engineTypes={engineTypes} />}
      <Button style={{margin: '50px 0px'}}type="primary" onClick={showAddModal} icon={<PlusOutlined />}>
        Add a new car
      </Button>
      <div className={styles.header}></div>
      <Table dataSource={cars} columns={columns} pagination={{ pageSize: 3 }} />
      {isEditModalOpen && <EditVehicleRegistration isModalOpen={isEditModalOpen} handleCancel={handleEditModalCancel} handleOk={handleEditModelOk} car={car} bodyTypes={bodyTypes} engineTypes={engineTypes} />}
    </div>
  );
}

export default VehicleRegistration;
