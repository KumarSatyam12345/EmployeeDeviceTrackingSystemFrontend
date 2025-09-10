import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
import axios from "axios";
 
interface Device {
  name: string;
  model: string;
}
 
interface Employee {
  name: string;
  email: string;
}
 
interface Dashboard {
  deviceID: string;
  employeeID: string;
  issueDate: string;
  returnDate: string;
}
 
interface DeviceContextType {
  devices: Device[];
  employees: Employee[];
  dashboards: Dashboard[];
  addDevice: (device: Device) => void;
  addEmployee: (employee: Employee) => void;
  addDashboard: (dashboard: Dashboard) => void;
  fetchDevices: () => Promise<Device[]>;
  fetchEmployees: () => Promise<Employee[]>;
  fetchDashboards: () => Promise<Dashboard[]>;
}
 
const DeviceContext = createContext<DeviceContextType | undefined>(undefined);
 
export const DeviceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
 
  const API_URL = "http://localhost:8080"; // Mock API
 
  const fetchDevices = async (): Promise<Device[]> => {
    try {
      const response = await axios.get(`${API_URL}/device/getAllDevice`); // `/posts` for mock data
      const devices = response.data.map((result: any) => ({
        name: result.name,
        model: result.model,
      }));
      setDevices(devices);
      return devices;
    } catch (error) {
      console.error("Failed to fetch devices:", error);
      return [];
    }
  };
 
  const fetchEmployees = async (): Promise<Employee[]> => {
    try {
      const response = await axios.get(`${API_URL}/user/getAllUser`); 
      const employees = response.data.map((user: any) => ({
        name: user.name,
        email: user.email,
      }));
      setEmployees(employees);
      return employees;
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      return [];
    }
  };
 
  const fetchDashboards = async (): Promise<Dashboard[]> => {
    try {
      const response = await axios.get(`${API_URL}/inventory/getAllRepo`); 
      console.log(response);
      
      const dashboards = response.data.map((result: any) => ({
        deviceID: result.user.uid,
        employeeID: result.device.dId,
        issueDate: result.dateofIssue,
        returnDate: result.returnDate,
      }));
      setDashboards(dashboards);
      return dashboards;
    } catch (error) {
      console.error("Failed to fetch dashboards:", error);
      return [];
    }
  };
 
  const addDevice = (device: Device) => {
    setDevices((prevDevices) => [...prevDevices, device]);
  };
 
  const addEmployee = (employee: Employee) => {
    setEmployees((prevEmployees) => [...prevEmployees, employee]);
  };
 
  const addDashboard = (dashboard: Dashboard) => {
    setDashboards((prevDashboards) => [...prevDashboards, dashboard]);
  };
 
  useEffect(() => {
    fetchDevices();
    fetchEmployees();
    fetchDashboards();
  }, []);
 
  return (
    <DeviceContext.Provider
      value={{
        devices,
        employees,
        dashboards,
        addDevice,
        addEmployee,
        addDashboard,
        fetchDevices,
        fetchEmployees,
        fetchDashboards,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
 
export const useDeviceContext = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDeviceContext must be used within a DeviceProvider");
  }
  return context;
};
 
 