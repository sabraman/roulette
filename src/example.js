import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BiTrash, BiGridVertical, BiPlus } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import Roulette from "./Roulette";
import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import "./styles.css";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Рулетка</Link>
          </li>
          <li>
            <Link to="/coils">Койлы</Link>
          </li>
        </ul>

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <DraggeableForm />
          </Route>
          <Route path="/coils">
            <Coils />
          </Route>
        </Switch>
      </nav>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}
const DraggeableForm = () => {
  const [inputList, setInputList] = useState([
    {
      id: uuidv4(),
      text: "Где туалет?"
    },
    {
      id: uuidv4(),
      text: "Можно вкусную жижу"
    },
    {
      id: uuidv4(),
      text: "А стики есть?"
    },
    {
      id: uuidv4(),
      text: "Испаритель на вейп"
    },
    {
      id: uuidv4(),
      text: "Батарейки есть?"
    },
    {
      id: uuidv4(),
      text: "А где банкомат?"
    },
    {
      id: uuidv4(),
      text: "А на Юнке за 200р"
    },
    {
      id: uuidv4(),
      text: "Стеклышки есть?"
    },
    {
      id: uuidv4(),
      text: "Можно кент с кнопкой"
    },
    {
      id: uuidv4(),
      text: "Вака есть?"
    },
    {
      id: uuidv4(),
      text: "Зажигалки Есть?"
    }
  ]);
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { text: "", id: uuidv4() }]);
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(inputList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setInputList(items);
  }

  return (
    <div className="main-form">
      <div className="text-title">
        <h2>Vapar Рулетка</h2>
      </div>
      {/*  */}
      <Roulette data={inputList} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="items">
          {(provided) => (
            <ul
              className="items"
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ listStyle: "none" }}
            >
              {inputList.map((x, index) => {
                return (
                  <Draggable key={x.id} draggableId={x.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="list-item"
                      >
                        <div className="item">
                          <BiGridVertical />
                          <input
                            name="text"
                            placeholder="Введи что-нибудь(или нет)"
                            value={x.text}
                            onChange={(e) => handleInputChange(e, index)}
                            className="input"
                          />
                          <div className="btn-box">
                            {inputList.length !== 1 && (
                              <button
                                className="button"
                                onClick={() => handleRemoveClick(index)}
                              >
                                <BiTrash />
                              </button>
                            )}
                          </div>
                        </div>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <button
        onClick={handleAddClick}
        style={{ marginLeft: "2.1rem" }}
        className="button"
      >
        <BiPlus />
      </button>
    </div>
  );
};

function Coils() {
  const defaultData = [
    {
      coils: "Smok - LP1 (0.8, 0.9, 1.2)",
      devices: "Smok - Novo 4, Pozz Pro"
    },
    {
      coils: "Smok - LP2 (0.23, 0.4, 0.6)",
      devices: "Smok - Morph, Morph S, Nord 50W, RPM 4, G-priv pod, G-priv pro"
    },
    {
      coils: "Smok - RPM (0.3, 0.4, 0.6, 0.8, 1.0, 1.2)",
      devices:
        "Smok - RPM40, RPM80, RPM80 Pro, Pozz X, Alike, Nord 2, Nord 4, Fetch Mini, Fetch Pro, RPM Lite"
    },
    {
      coils: "Smok - Nord (0.6, 0.8, 1.4)",
      devices:
        "Smok - Nord, Nord 2, Fetch Mini, Trinity Alpha, Nord Pen 22, Nord Pen 19, Priv N19, Nord Vape Pen Tank, ALIKE, Priv V8 Nord"
    },
    {
      coils: "Smok - RPM 2 (0.16, 0.25, 0.6)",
      devices: "Smok - RPM 2, Nord 4, Nord X"
    },
    {
      coils:
        "Smok - Baby V2 (S2 0.15ohm, K1 0.2ohm, K4 0.15ohm, A1 0.17ohm, A2 0.2ohm, A3 0.15ohm,)",
      devices:
        "Smok - Stick V9 max Kit, Stick V9 Kit, TFV8 Baby V2 Tank, R-kiss Kit"
    },
    {
      coils:
        "Smok - Baby (X4 0.15ohm, T8 0.15ohm, T12 Red 0.15ohm, T12 0.15ohm, Strip 0.15ohm, Mesh 0.15ohm, M2 0.15ohm, T6 0.2ohm, Q4 0.4ohm, Q2 0.4ohm, M2 0.25ohm, RBA)",
      devices:
        "Smok - Scar-mini Kit, TFV9 mini Tank, Rigel Kit, Scar-18 Kit, TFV9 Tank, TFV8 Big Baby Tank, TFV8 baby Tank, TFV12 baby prince Tank Rigel Mini Kit"
    },
    {
      coils: "Geekvape - B (0.3, 0.4, 0.6, 1.2)",
      devices: "Geekvape - Boost, Boost Plus, Z Nano, Hero Pod"
    },
    {
      coils: "Geekvape - G (0.6, 0.8, 1.0, 1.2)",
      devices: "Geekvape - Aegis Pod, Wenax Pod"
    },
    {
      coils: "Geekvape - P (0.2, 0.4)",
      devices: "Geekvape - Boost Pro, Obelisk"
    },
    {
      coils: "Voopoo - TPP (0.15, 0.2 , 0.3)",
      devices: "Voopoo - TPP Pod Tank, Drag X Plus,Drag 3 TPP Kit"
    },
    {
      coils: "Voopoo - PNP  (0.15, 0.2, 0.3, 0.45, 0.6, 0.8, 1.0)",
      devices:
        "Voopoo - Vinci, Drag S, Drag X, Drag Baby Trio, Argus Air, PnP Pod Tank, Argus GT, V Suit"
    },
    {
      coils: "Geekvape - Aegis Nano (0.6, 1.2)",
      devices: "Geekvape - Aegis Nano"
    },
    {
      coils: "Voopoo - Vinci, Drag Nano 2 (0.8, 1.2)",
      devices: "Voopoo - Vinci Pod, Drag Nano"
    }
  ];

  // const columns: ColumnDef<Person>[] = [
  const columns = [
    {
      accessorKey: "coils",
      cell: (info) => info.getValue(),
      header: () => <span>Койлы</span>,
      footer: (info) => info.column.id
    },
    {
      accessorFn: (row) => row.devices,
      id: "devices",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Девайсы</span>,
      footer: (info) => info.column.id
    }
  ];
  const [data, setData] = React.useState(() => [...defaultData]);
  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
