import { useState } from "react";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import DataTable, { type Column } from "../../components/DataTable";
import FormModal from "../../components/FormModal";
import ConfirmDialog from "../../components/ConfirmDialog";
import { DEPARTAMENTOS_DEMO, type Departamento } from "../../Data/departamentos";
import { Plus, Search } from "lucide-react";

const DEPARTAMENTO_VACIO = { nombre: "", codigo: "", responsable: "" };

export default function Departamentos() {
  const [departamentos, setDepartamentos] = useState<Departamento[]>(DEPARTAMENTOS_DEMO);
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editando, setEditando] = useState<Departamento | null>(null);
  const [form, setForm] = useState(DEPARTAMENTO_VACIO);
  const [porEliminar, setPorEliminar] = useState<Departamento | null>(null);

  const filas = departamentos.filter((d) =>
    `${d.nombre} ${d.codigo} ${d.responsable}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  const abrirNuevo = () => {
    setEditando(null);
    setForm(DEPARTAMENTO_VACIO);
    setModalAbierto(true);
  };

  const abrirEditar = (d: Departamento) => {
    setEditando(d);
    setForm({ nombre: d.nombre, codigo: d.codigo, responsable: d.responsable });
    setModalAbierto(true);
  };

  const guardar = () => {
    if (editando) {
      setDepartamentos((prev) => prev.map((d) => (d.id === editando.id ? { ...d, ...form } : d)));
    } else {
      setDepartamentos((prev) => [...prev, { id: Date.now(), ...form }]);
    }
    setModalAbierto(false);
  };

  const eliminar = () => {
    if (!porEliminar) return;
    setDepartamentos((prev) => prev.filter((d) => d.id !== porEliminar.id));
    setPorEliminar(null);
  };

  const columns: Column<Departamento>[] = [
    { header: "Departamento", render: (d) => <span className="font-medium">{d.nombre}</span> },
    { header: "Código", render: (d) => d.codigo },
    { header: "Responsable", render: (d) => d.responsable },
  ];

  return (
    <Card
      title="Departamentos"
      action={
        <Button icon={<Plus size={18} />} onClick={abrirNuevo}>
          Agregar
        </Button>
      }
    >
      <div className="relative mb-4 max-w-sm">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-texto-secundario pointer-events-none" />
        <Input
          label="Buscar"
          placeholder="Nombre, código o responsable…"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="pl-11"
        />
      </div>

      <DataTable columns={columns} rows={filas} onEdit={abrirEditar} onDelete={setPorEliminar} />

      <FormModal
        open={modalAbierto}
        title={editando ? "Editar departamento" : "Agregar departamento"}
        onClose={() => setModalAbierto(false)}
        onSubmit={guardar}
      >
        <Input
          label="Nombre del departamento"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
        />
        <Input
          label="Código"
          value={form.codigo}
          onChange={(e) => setForm({ ...form, codigo: e.target.value })}
          required
        />
        <Input
          label="Responsable"
          value={form.responsable}
          onChange={(e) => setForm({ ...form, responsable: e.target.value })}
          required
        />
      </FormModal>

      <ConfirmDialog
        open={porEliminar !== null}
        title="¿Eliminar departamento?"
        description={porEliminar ? `Se eliminará “${porEliminar.nombre}” permanentemente.` : undefined}
        variant="danger"
        confirmLabel="Sí"
        cancelLabel="No"
        onConfirm={eliminar}
        onCancel={() => setPorEliminar(null)}
      />
    </Card>
  );
}
