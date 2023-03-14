import {
  TableHead,
  TableData,
  TableRow,
  Table,
  MenuContainer,
  MenuItems,
} from "../../styles/styles";
import styles from "../../styles/common.module.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../../node_modules/axios/index";
import { useRef } from "react";

const MusicTable = () => {
  interface mus {
    Title:string;
    Album:string;
    Artist:string;
    Genre:string;
    _id:string;

  }
  const current = useRef({
    option: '0',
  });
  const [musics, setMusics] = useState<Array<mus>>([])
  console.log(musics);
  


  function loadData() {
    // throw new Error("Function not implemented.");
  }
  const Delete = (title: string) => {
    alert(title);

    if (window.confirm("Are you sure that you want to delete that account?")) {
      axios.post("http://localhost:5000/Removesong", {
        title,
      });
      // toast.success("Contact is deleted succesfully");
      // setTimeout(() => loadData(), 500);
    } else {
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const tableHead: Array<{ label: string; id: string }> = [
    {
      label: "#",
      id: "1",
    },
    {
      label: "Title",
      id: "2",
    },
    {
      label: "Album",
      id: "3",
    },
    {
      label: "Genre",
      id: "4",
    },
    {
      label: "",
      id: "5",
    },
  ];
  const fetchdata = async () => {
    const data = await axios.get("http://localhost:5000/Getsong");
    // console.log("pro", data.data);
    console.log(data);
    setMusics(data.data);
  };
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div style={{}}>
      <Table
        cellPadding={"0"}
        cellSpacing={"0"}
        className="table"
        style={{ width: "100%" }}
      >
        <thead>
          <TableRow
            style={{
              boxShadow: "0px 1px 0px 0px #ccc",
              borderRadius: "18px 18px 0px 0px",
            }}
          >
            {tableHead.map((item) => {
              return (
                <TableHead style={{ width: "auto" }} scope="col">
                  {item.label}
                </TableHead>
              );
            })}
          </TableRow>
        </thead>
        <tbody>
          {musics.map((item, index) => {
            return (
              <TableRow>
                <TableData align="left" scope="row" style={{ width: "5%" }}>
                  {index + 1}
                </TableData>
                <TableData style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ fontWeight: "600" }}>{item.Title}</p>
                  <p
                    style={{
                      fontSize: ".6em",
                      lineHeight: "10px",
                      position: "relative",
                      bottom: "0.7em",
                    }}
                  >
                    {item.Artist}
                  </p>
                </TableData>
                <TableData>{item.Album}</TableData>
                <TableData>{item.Genre}</TableData>

                <TableData
                  style={{
                    fontSize: "1.5em",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100px",
                  }}
                  className={styles.menuItem}
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                    current.current.option = item._id;
                  }}
                >
                  <div
                    id={item._id}
                    style={{
                      display:
                        menuOpen && current.current.option === item._id
                          ? "block"
                          : "none",
                    }}
                  >
                    <MenuContainer>
                      <MenuItems color="rgba(0,255,0,0.4)">Update</MenuItems>
                      <MenuItems
                        color="rgba(220,20,60,0.7)"
                        onClick={() => Delete(item._id)}
                      >
                        Del
                      </MenuItems>
                    </MenuContainer>
                  </div>
                  <div style={{ position: "absolute" }}>...</div>
                </TableData>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
export default MusicTable;
