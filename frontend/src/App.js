import { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button
} from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

import { motion } from "framer-motion";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch("http://127.0.0.1:8000/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  };

  const createUser = () => {
    fetch("http://127.0.0.1:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        age: Number(age)
      })
    }).then(() => {
      fetchUsers();
      setName("");
      setAge("");
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Lista de Usuários
      </Typography>

      {/* INPUTS */}
      <TextField
        label="Nome"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ marginTop: 2 }}
      />

      <TextField
        label="Idade"
        type="number"
        fullWidth
        value={age}
        onChange={(e) => setAge(e.target.value)}
        sx={{ marginTop: 2 }}
      />

      <Button
        variant="contained"
        onClick={createUser}
        sx={{ marginTop: 2 }}
      >
        Criar usuário
      </Button>

      {/* LISTA */}
      {users.map((user, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card sx={{ marginTop: 2 }}>
            <CardContent>
              <Typography variant="h6">
                👤 {user.name}
              </Typography>
              <Typography color="text.secondary">
                Idade: {user.age}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      {/* GRÁFICO */}
      <Typography variant="h5" sx={{ marginTop: 4 }}>
        Gráfico de Idades
      </Typography>

      <BarChart width={350} height={250} data={users}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="age" fill="#1976d2" />
      </BarChart>
    </Container>
  );
}

export default App;