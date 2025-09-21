import DashboardLayout from "../components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  MoreHorizontal,
  Plus,
  SlidersHorizontal,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { useMemo, useState } from "react";

type Row = {
  id: string;
  user: string;
  project: string;
  address: string;
  dateISO: string;
  status: string;
};

const initialRows: Row[] = [
  {
    id: "#CMP801",
    user: "Natai Craig",
    project: "Landing Page",
    address: "Meadow Lane Oakland",
    dateISO: new Date().toISOString(),
    status: "In Progress",
  },
  {
    id: "#CMP802",
    user: "Kate Morrison",
    project: "CRM Admin pages",
    address: "Larry San Francisco",
    dateISO: new Date(Date.now() - 60 * 1000).toISOString(),
    status: "Complete",
  },
  {
    id: "#CMP803",
    user: "Drew Cano",
    project: "Client Project",
    address: "Bagwell Avenue Ocala",
    dateISO: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    status: "Pending",
  },
  {
    id: "#CMP804",
    user: "Orlando Diggs",
    project: "Admin Dashboard",
    address: "Washburn Baton Rouge",
    dateISO: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: "Approved",
  },
  {
    id: "#CMP805",
    user: "Andi Lane",
    project: "App Landing Page",
    address: "Nest Lane Olivette",
    dateISO: new Date("2023-02-02").toISOString(),
    status: "Rejected",
  },
  {
    id: "#CMP806",
    user: "Natai Craig",
    project: "Landing Page",
    address: "Meadow Lane Oakland",
    dateISO: new Date().toISOString(),
    status: "In Progress",
  },
  {
    id: "#CMP807",
    user: "Drew Cano",
    project: "Client Project",
    address: "Bagwell Avenue Ocala",
    dateISO: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: "Pending",
  },
  {
    id: "#CMP808",
    user: "Kate Morrison",
    project: "CRM Admin pages",
    address: "Larry San Francisco",
    dateISO: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Approved",
  },
  {
    id: "#CMP809",
    user: "Andi Lane",
    project: "App Landing Page",
    address: "Nest Lane Olivette",
    dateISO: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Rejected",
  },
];

const statusColor: Record<string, string> = {
  "In Progress":
    "bg-blue-100 text-blue-700 dark:bg-blue-400/20 dark:text-blue-300",
  Complete:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/20 dark:text-emerald-300",
  Pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-400/20 dark:text-amber-300",
  Approved:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-400/20 dark:text-indigo-300",
  Rejected: "bg-rose-100 text-rose-700 dark:bg-rose-400/20 dark:text-rose-300",
};

type SortKey = "id" | "user" | "project" | "address" | "dateISO" | "status";

export default function Orders() {
  const [rows, setRows] = useState<Row[]>(initialRows);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [project, setProject] = useState<string>("all");
  const [address, setAddress] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const projects = useMemo(
    () => Array.from(new Set(rows.map((r) => r.project))),
    [rows]
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let out = rows.filter((r) =>
      [
        r.id,
        r.user,
        r.project,
        r.address,
        new Date(r.dateISO).toLocaleDateString(),
        r.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
    if (status !== "all") out = out.filter((r) => r.status === status);
    if (project !== "all") out = out.filter((r) => r.project === project);
    if (address)
      out = out.filter((r) =>
        r.address.toLowerCase().includes(address.toLowerCase())
      );
    if (from) out = out.filter((r) => new Date(r.dateISO) >= new Date(from));
    if (to) out = out.filter((r) => new Date(r.dateISO) <= new Date(to));

    out.sort((a: any, b: any) => {
      const A = a[sortKey];
      const B = b[sortKey];
      if (sortKey === "dateISO") {
        return sortDir === "asc"
          ? new Date(A).getTime() - new Date(B).getTime()
          : new Date(B).getTime() - new Date(A).getTime();
      }
      return sortDir === "asc"
        ? String(A).localeCompare(String(B))
        : String(B).localeCompare(String(A));
    });
    return out;
  }, [rows, query, status, project, address, from, to, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  // Add order dialog state
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Omit<Row, "id"> & { id?: string }>({
    user: "",
    project: "",
    address: "",
    dateISO: new Date().toISOString().slice(0, 10),
    status: "In Progress",
  });

  const submit = () => {
    const nextNum = 800 + rows.length + 1;
    const id = form.id?.trim() || `#CMP${nextNum}`;
    const newRow: Row = {
      id,
      user: form.user.trim(),
      project: form.project.trim(),
      address: form.address.trim(),
      dateISO: new Date(form.dateISO).toISOString(),
      status: form.status,
    };
    setRows((r) => [newRow, ...r]);
    setOpen(false);
    setPage(1);
  };

  return (
    <DashboardLayout breadcrumb={["Dashboards", "eCommerce"]}>
      <main className="p-4 md:p-6">
        <Card className="rounded-2xl">
          <CardHeader className="p-4 sm:p-5 pb-3 flex-row items-center justify-between gap-2 flex-wrap">
            <CardTitle className="text-base">Order List</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 min-w-0">
                <Input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search orders"
                  aria-label="Search orders"
                />
              </div>
              <Select
                value={status}
                onValueChange={(v) => {
                  setStatus(v);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Complete">Complete</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" aria-label="Filter">
                    <SlidersHorizontal className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80">
                  <div className="grid gap-3">
                    <div className="text-sm font-medium">Filters</div>
                    <div className="grid gap-2">
                      <label
                        className="text-xs text-muted-foreground"
                        htmlFor="project"
                      >
                        Project
                      </label>
                      <Select
                        value={project}
                        onValueChange={(v) => {
                          setProject(v);
                          setPage(1);
                        }}
                      >
                        <SelectTrigger id="project">
                          <SelectValue placeholder="Project" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All projects</SelectItem>
                          {projects.map((p) => (
                            <SelectItem key={p} value={p}>
                              {p}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <label
                        className="text-xs text-muted-foreground"
                        htmlFor="address"
                      >
                        Address contains
                      </label>
                      <Input
                        id="address"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                          setPage(1);
                        }}
                        placeholder="e.g. San Francisco"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label
                          className="text-xs text-muted-foreground"
                          htmlFor="from"
                        >
                          From
                        </label>
                        <Input
                          id="from"
                          type="date"
                          value={from}
                          onChange={(e) => {
                            setFrom(e.target.value);
                            setPage(1);
                          }}
                        />
                      </div>
                      <div>
                        <label
                          className="text-xs text-muted-foreground"
                          htmlFor="to"
                        >
                          To
                        </label>
                        <Input
                          id="to"
                          type="date"
                          value={to}
                          onChange={(e) => {
                            setTo(e.target.value);
                            setPage(1);
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setProject("all");
                          setAddress("");
                          setFrom("");
                          setTo("");
                          setStatus("all");
                          setQuery("");
                          setPage(1);
                        }}
                      >
                        Reset
                      </Button>
                      <Button size="sm" onClick={() => null}>
                        Apply
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" aria-label="Add new">
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add order</DialogTitle>
                    <DialogDescription>
                      Fill in the details to create a new order row.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-3">
                    <div className="grid gap-1">
                      <label className="text-sm" htmlFor="user">
                        User
                      </label>
                      <Input
                        id="user"
                        value={form.user}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, user: e.target.value }))
                        }
                      />
                    </div>
                    <div className="grid gap-1">
                      <label className="text-sm" htmlFor="project">
                        Project
                      </label>
                      <Input
                        id="project"
                        value={form.project}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, project: e.target.value }))
                        }
                      />
                    </div>
                    <div className="grid gap-1">
                      <label className="text-sm" htmlFor="address">
                        Address
                      </label>
                      <Input
                        id="address"
                        value={form.address}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, address: e.target.value }))
                        }
                      />
                    </div>
                    <div className="grid gap-1 grid-cols-2">
                      <div>
                        <label className="text-sm" htmlFor="date">
                          Date
                        </label>
                        <Input
                          id="date"
                          type="date"
                          value={form.dateISO}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, dateISO: e.target.value }))
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm" htmlFor="status">
                          Status
                        </label>
                        <Select
                          value={form.status}
                          onValueChange={(v) =>
                            setForm((f) => ({ ...f, status: v }))
                          }
                        >
                          <SelectTrigger id="status">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="In Progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="Complete">Complete</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Approved">Approved</SelectItem>
                            <SelectItem value="Rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="ghost" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={submit}>Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto overscroll-x-contain max-w-full">
              <table
                className="w-full text-sm min-w-[520px] sm:min-w-[720px] table-fixed"
                role="table"
              >
                <thead>
                  <tr className="border-b text-muted-foreground">
                    {(
                      [
                        { key: "id", label: "Id" },
                        { key: "user", label: "User" },
                        { key: "project", label: "Project" },
                        { key: "address", label: "Address" },
                        { key: "dateISO", label: "Date" },
                        { key: "status", label: "Status" },
                      ] as { key: SortKey; label: string }[]
                    ).map(({ key, label }) => (
                      <th
                        key={key}
                        scope="col"
                        className={`p-3 sm:p-4 text-left font-medium whitespace-nowrap ${key === "project" || key === "address" ? "hidden md:table-cell" : ""}`}
                      >
                        <button
                          className="inline-flex items-center gap-1 hover:text-foreground"
                          onClick={() => toggleSort(key)}
                          aria-sort={
                            sortKey === key
                              ? sortDir === "asc"
                                ? "ascending"
                                : "descending"
                              : "none"
                          }
                        >
                          <span>{label}</span>
                          <ArrowUpDown className="h-3.5 w-3.5 opacity-60" />
                        </button>
                      </th>
                    ))}
                    <th className="p-3 sm:p-4 w-10" />
                  </tr>
                </thead>
                <tbody>
                  {current.map((r) => (
                    <tr key={r.id} className="border-b last:border-0">
                      <td className="p-3 sm:p-4 font-medium">{r.id}</td>
                      <td className="p-3 sm:p-4 whitespace-nowrap">{r.user}</td>
                      <td
                        className="p-3 sm:p-4 text-muted-foreground max-w-[180px] truncate hidden md:table-cell"
                        title={r.project}
                      >
                        {r.project}
                      </td>
                      <td
                        className="p-3 sm:p-4 text-muted-foreground max-w-[220px] truncate hidden md:table-cell"
                        title={r.address}
                      >
                        {r.address}
                      </td>
                      <td className="p-3 sm:p-4 text-muted-foreground">
                        {new Date(r.dateISO).toLocaleDateString()}
                      </td>
                      <td className="p-3 sm:p-4">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[r.status]}`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
                          {r.status}
                        </span>
                      </td>
                      <td className="p-3 sm:p-4 text-right text-muted-foreground">
                        <MoreHorizontal className="h-4 w-4" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-3 sm:py-4">
              <div className="text-xs text-muted-foreground">
                Page {page} of {totalPages} • {filtered.length} results
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  className="h-8 px-2 rounded-md border text-sm disabled:opacity-50"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Prev
                </button>
                {Array.from({ length: totalPages })
                  .slice(0, 5)
                  .map((_, i) => {
                    const n = i + 1;
                    return (
                      <button
                        key={n}
                        onClick={() => setPage(n)}
                        className={`h-8 w-8 rounded-md text-sm ${n === page ? "border" : "text-muted-foreground"}`}
                      >
                        {n}
                      </button>
                    );
                  })}
                <button
                  className="h-8 px-2 rounded-md border text-sm disabled:opacity-50"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </DashboardLayout>
  );
}
