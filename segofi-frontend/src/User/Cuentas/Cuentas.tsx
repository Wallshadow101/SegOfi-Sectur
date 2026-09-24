import { useState } from "react";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import DataTable, { type Column } from "../../components/DataTable";
import FormModal from "../../components/FormModal";
import ConfirmDialog from "../../components/ConfirmDialog";
import { DEPARTAMENTOS_DEMO } from "../../Data/departamentos";
import type { Rol } from "../../Guards/authTypes";
import { Plus, Search } from "lucide-react";

interface Cuenta {
  id: number;
  nombre: string;
  correo: string;
  rol: Rol;
  departamento: string;
}

const ROLES: { value: Rol; label: string }[] = [
  { value: "Usuario", label: "Usuario" },
  { value: "JefeDepartamento", label: "Jefe de departamento" },
  { value: "Directora", label: "Directora" },
  { value: "Administrador", label: "Administrador" },
];

const DEPARTAMENTOS_OPTS = DEPARTAMENTOS_DEMO.map((d) => ({ value: d.nombre, label: d.nombre }));

const CUENTAS_DEMO: Cuenta[] = [
  { id: 1, nombre: "Lic. Carlos Eduardo Martínez López", correo: "usuario@puebla.gob.mx", rol: "Usuario", departamento: "Protocolos" },
  { id: 2, nombre: "Ing. Jorge Luis Cano Pérez", correo: "admin@puebla.gob.mx", rol: "Administrador", departamento: "Desarrollo Turístico" },
  { id: 3, nombre: "Mtra. Fernanda Ibarra Solís", correo: "directora@puebla.gob.mx", rol: "Directora", departamento: "Promoción Turística" },
  { id: 4, nombre: "Lic. Ana Patricia Rojas Vega", correo: "jefedepto@puebla.gob.mx", rol: "JefeDepartamento", departamento: "18 Ote" },
];

const CUENTA_VACIA = { nombre: "", correo: "", rol: "Usuario" as Rol, departamento: DEPARTAMENTOS_DEMO[0].nombre };

export default function Cuentas() {
  const [cuentas, setCuentas] = useState<Cuenta[]>(CUENTAS_DEMO);
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editando, setEditando] = useState<Cuenta | null>(null);
  const [form, setForm] = useState(CUENTA_VACIA);
  const [porEliminar, setPorEliminar] = useState<Cuenta | null>(null);

  const filas = cuentas.filter((c) =>
    `${c.nombre} ${c.correo} ${c.departamento}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  const abrirNueva = () => {
    setEditando(null);
    setForm(CUENTA_VACIA);
    setModalAbierto(true);
  };

  const abrirEditar = (c: Cuenta) => {
    setEditando(c);
    setForm({ nombre: c.nombre, correo: c.correo, rol: c.rol, departamento: c.departamento });
    setModalAbierto(true);
  };

  const guardar = () => {
    if (editando) {
      setCuentas((prev) => prev.map((c) => (c.id === editando.id ? { ...c, ...form } : c)));
    } else {
      setCuentas((prev) => [...prev, { id: Date.now(), ...form }]);
    }
    setModalAbierto(false);
  };

  const eliminar = () => {
    if (!porEliminar) return;
    setCuentas((prev) => prev.filter((c) => c.id !== porEliminar.id));
    setPorEliminar(null);
  };

  const columns: Column<Cuenta>[] = [
    { header: "Nombre", render: (c) => <span className="font-medium">{c.nombre}</span> },
    { header: "Correo", render: (c) => c.correo },
    { header: "Rol", render: (c) => c.rol },
    { header: "Departamento", render: (c) => c.departamento },
  ];

  return (
    <Card
      title="Cuentas"
      action={
        <Button icon={<Plus size={18} />} onClick={abrirNueva}>
          Agregar
        </Button>
      }
    >
      <div className="relative mb-4 max-w-sm">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-texto-secundario pointer-events-none" />
        <Input
          label="Buscar"
          placeholder="Nombre, correo o departamento…"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="pl-11"
        />
      </div>

      <DataTable columns={columns} rows={filas} onEdit={abrirEditar} onDelete={setPorEliminar} />

      <FormModal
        open={modalAbierto}
        title={editando ? "Editar cuenta" : "Agregar cuenta"}
        onClose={() => setModalAbierto(false)}
        onSubmit={guardar}
      >
        <Input
          label="Nombre completo"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
        />
        <Input
          label="Correo institucional"
          type="email"
          value={form.correo}
          onChange={(e) => setForm({ ...form, correo: e.target.value })}
          required
        />
        <Select
          label="Rol"
          options={ROLES}
          value={form.rol}
          onChange={(e) => setForm({ ...form, rol: e.target.value as Rol })}
        />
        <Select
          label="Departamento"
          options={DEPARTAMENTOS_OPTS}
          value={form.departamento}
          onChange={(e) => setForm({ ...form, departamento: e.target.value })}
        />
      </FormModal>

      <ConfirmDialog
        open={porEliminar !== null}
        title="¿Eliminar cuenta?"
        description={porEliminar ? `Se eliminará la cuenta de “${porEliminar.nombre}”.` : undefined}
        variant="danger"
        confirmLabel="Sí"
        cancelLabel="No"
        onConfirm={eliminar}
        onCancel={() => setPorEliminar(null)}
      />
    </Card>
  );
}
