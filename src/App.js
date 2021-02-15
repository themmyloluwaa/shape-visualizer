import { useState, useMemo, useEffect, useCallback } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ShapeDrawer from "./components/ShapeDrawer/ShapeDrawer";
import ShapeSelection from "./components/ShapeInput/ShapeSelection";
import { useLocalStorage } from "./hooks/useLocalStorage";
import "./App.css";

function App() {
  //state to hold each shape selected.
  const [data, setData] = useState({});
  //state that holds all previously saved shapes. Always in sync with localstorage
  const [savedShapes, setSavedShapes] = useLocalStorage("shapes", []);

  const [loading, setLoading] = useState(true);

  //function to save the shape and reset current shape
  const saveShape = (saveData) => {
    saveData.id = new Date().getTime();
    const dataToSave = [saveData, ...savedShapes];
    setSavedShapes(dataToSave);
    setData({});
  };

  const handleDelete = useCallback(
    (id) => {
      const dataToRetain = savedShapes.filter((shape) => shape.id !== id);
      setSavedShapes(dataToRetain);
    },
    [savedShapes, setSavedShapes]
  );
  // delay component render by 2s for text animation to complete
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading]);

  //memoizing the saved shape renders to prevent uneccessary  or renders
  const memoizedShapes = useMemo(
    () =>
      savedShapes.length > 0 &&
      savedShapes.map((aShape, i) => {
        return (
          <Col className="mx-1 my-1 border" key={i}>
            <ShapeDrawer data={aShape} showEdits={false} />
            <div>
              <button
                id="delete-one"
                className="btn btn-danger text-white"
                onClick={() => handleDelete(aShape.id)}
              >
                Delete
              </button>
            </div>
          </Col>
        );
      }),
    [handleDelete, savedShapes]
  );

  // View logic
  return (
    <>
      <Container>
        <Row className="mt-5">
          <Col className="text-typing">
            <h1 className="text-center">Shape Drawer App</h1>
          </Col>
        </Row>
        {!loading && (
          <>
            <Card
              style={{ margin: "100px auto", minHeight: "300px" }}
              className="border"
            >
              <Row>
                <Col xs="12" className="mb-3" md="6">
                  <ShapeSelection setData={setData} />
                </Col>
                {data.hasOwnProperty("shape") && (
                  <Col className="mb-3" md="6">
                    <ShapeDrawer
                      data={data}
                      showEdits={true}
                      saveShape={saveShape}
                    />
                  </Col>
                )}
              </Row>
              <Row></Row>
            </Card>
            <h3 className="bold">Your Saved Shapes</h3>
            <Row>
              {savedShapes.length > 0 && (
                <Col xs="12 mb-3">
                  <button
                    id="delete-all"
                    className="btn btn-danger text-white"
                    onClick={() => setSavedShapes([])}
                  >
                    Delete All
                  </button>
                </Col>
              )}
              {memoizedShapes}
            </Row>
          </>
        )}
      </Container>

      {!loading && (
        <footer className="border mt-5  py-5 text-center">
          <h5>Made with 😴 && ❤️‍🔥 By Temiloluwa Philip Ojo</h5>
          <p>
            <a href="https://twitter.com/themmyloluwaaa">{" <CodeKagei />"}</a>
          </p>
        </footer>
      )}
    </>
  );
}

export default App;
