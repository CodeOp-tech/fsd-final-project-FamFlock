import React, { useState } from "react";
// import TripByIdView from "../views/TripByIdView";

// I want all values to be set and saved when submit, even after refreshing
const TripByIdList = (props) => {
  let emptyForm = {
    destin: false,
    decideDates: false,
    bookFlight: false,
    bookAccom: false,
    essent: false,
    planAct: false,
    decideTrans: false,
    splitPlan: false,
    reservations: false,
    // think about how to save customizable empty inputs!!!!
  };

  // Use empty form to be the list state
  const [list, setList] = useState(emptyForm);

  const handleInputChange = (event) => {
    const value = event.target.checked;
    console.log(value);
    const name = event.target.name;
    // Set list to the check value
    setList((state) => ({
      ...state,
      [name]: value,
    }));
    // console.log(list);
  };

  // onSubmit function saves form checkboxes info to the TripByIdView,
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(list);
    props.addList(list);
  };

  return (
    <>
      <div className="container">
        <div className="mb-3 accordion accordion-flush accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseUnique"
              aria-expanded="false"
              aria-controls="flush-collapseUnique"
            >
              Click to start!
            </button>
          </h2>
          <div
            id="flush-collapseUnique"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingUnique"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body"></div>
            <div className="list-group">
              <form onSubmit={handleSubmit}>
                <a
                  href="#"
                  className="list-group-item list-group-item-action"
                  aria-current="true"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Group trip checklist</h5>
                    <small>3 days ago</small>
                  </div>
                  <div className="mb-1">
                    <ul>
                      <>
                        <div className="container text-center">
                          <div className="row">
                            <div className="col">
                              {/*this is destin*/}
                              <>
                                <div className="input-group mb-3">
                                  <div className="input-group-text">
                                    <input
                                      name="destin"
                                      id="destin"
                                      onChange={handleInputChange}
                                      className="form-check-input mt-0"
                                      type="checkbox"
                                      value={list.destin}
                                      aria-label="Checkbox for following text input"
                                    />
                                  </div>
                                  <div
                                    type="text"
                                    className="form-control"
                                    aria-label="Text input with
                    checkbox"
                                  >
                                    Choose a destination
                                  </div>
                                </div>
                              </>
                              {/*this is bookAccom*/}
                              <>
                                <div className="input-group mb-3">
                                  <div className="input-group-text">
                                    <input
                                      name="bookAccom"
                                      id="bookAccom"
                                      className="form-check-input mt-0"
                                      type="checkbox"
                                      value={list.bookAccom}
                                      onChange={handleSubmit}
                                      aria-label="Checkbox for following text input"
                                    />
                                  </div>
                                  <div
                                    type="text"
                                    className="form-control"
                                    aria-label="Text input with
                    checkbox"
                                  >
                                    Book accommodations
                                  </div>
                                </div>
                              </>
                              {/*this is decideTrans*/}
                              <>
                                <div className="input-group mb-3">
                                  <div className="input-group-text">
                                    <input
                                      className="form-check-input mt-0"
                                      type="checkbox"
                                      id="decideTrans"
                                      name="decideTrans"
                                      value={list.decideTrans}
                                      onChange={handleInputChange}
                                      aria-label="Checkbox for following text input"
                                    />
                                  </div>
                                  <div
                                    type="text"
                                    className="form-control"
                                    aria-label="Text input with
                    checkbox"
                                  >
                                    Decide on transportation
                                  </div>
                                </div>
                              </>
                              {/*this is the empty one*/}
                              <>
                                <div className="input-group mb-3">
                                  <div className="input-group-text">
                                    <input
                                      className="form-check-input mt-0"
                                      type="checkbox"
                                      value=""
                                      aria-label="Checkbox for following text input"
                                    />
                                  </div>
                                  <input
                                    type="text"
                                    name="emptyOne"
                                    id="emptyOne"
                                    value=""
                                    onChange={handleInputChange}
                                    className="form-control"
                                    aria-label="Text input with checkbox"
                                  />
                                </div>
                              </>
                            </div>
                            <div className="col order-5">
                              {/*this is bookFlight*/}
                              <>
                                <div className="input-group mb-3">
                                  <div className="input-group-text">
                                    <input
                                      className="form-check-input mt-0"
                                      type="checkbox"
                                      value={list.bookFlight}
                                      name="bookFlight"
                                      id="bookFlight"
                                      onChange={handleInputChange}
                                      aria-label="Checkbox for following text input"
                                    />
                                  </div>
                                  <div
                                    type="text"
                                    className="form-control"
                                    aria-label="Text input with
                    checkbox"
                                  >
                                    Book a flight
                                  </div>
                                </div>
                              </>
                              {/*this is planAct*/}
                              <>
                                <div className="input-group mb-3">
                                  <div className="input-group-text">
                                    <input
                                      className="form-check-input mt-0"
                                      type="checkbox"
                                      value={list.planAct}
                                      name="planAct"
                                      id="planAct"
                                      onChange={handleInputChange}
                                      aria-label="Checkbox for following text input"
                                    />
                                  </div>
                                  <div
                                    type="text"
                                    className="form-control"
                                    aria-label="Text input with
                    checkbox"
                                  >
                                    Plan your activities
                                  </div>
                                </div>
                              </>
                              {/*this is reservations*/}
                              <>
                                <div className="input-group mb-3">
                                  <div className="input-group-text">
                                    <input
                                      className="form-check-input mt-0"
                                      type="checkbox"
                                      value={list.reservations}
                                      name="reservations"
                                      id="reservations"
                                      onChange={handleInputChange}
                                      aria-label="Checkbox for following text input"
                                    />
                                  </div>
                                  <div
                                    type="text"
                                    className="form-control"
                                    aria-label="Text input with
                    checkbox"
                                  >
                                    Reservations
                                  </div>
                                </div>
                              </>
                              {/*this is the empty two*/}
                              <>
                                <div className="input-group mb-3">
                                  <div className="input-group-text">
                                    <input
                                      className="form-check-input mt-0"
                                      type="checkbox"
                                      value=""
                                      aria-label="Checkbox for following text input"
                                    />
                                  </div>
                                  <input
                                    type="text"
                                    value=""
                                    name="emptyTwo"
                                    id="emptyTwo"
                                    onChange={handleInputChange}
                                    className="form-control"
                                    aria-label="Text input with checkbox"
                                  />
                                </div>
                              </>
                            </div>
                            <div className="col order-1">
                              {/*this is decideDates*/}
                              <>
                                <div className="input-group mb-3">
                                  <div className="input-group-text">
                                    <input
                                      className="form-check-input mt-0"
                                      type="checkbox"
                                      value={list.decideDates}
                                      name="decideDates"
                                      id="decideDates"
                                      onChange={handleInputChange}
                                      aria-label="Checkbox for following text input"
                                    />
                                  </div>
                                  <div
                                    type="text"
                                    className="form-control"
                                    aria-label="Text input with
                    checkbox"
                                  >
                                    Decide on dates
                                  </div>
                                </div>
                              </>
                              {/*this is essent*/}
                              <>
                                <div className="input-group mb-3">
                                  <div className="input-group-text">
                                    <input
                                      className="form-check-input mt-0"
                                      type="checkbox"
                                      value={list.essent}
                                      name="essent"
                                      id="essent"
                                      onChange={handleInputChange}
                                      aria-label="Checkbox for following text input"
                                    />
                                  </div>
                                  <div
                                    type="text"
                                    className="form-control"
                                    aria-label="Text input with
                    checkbox"
                                  >
                                    Essentials are in order
                                  </div>
                                </div>
                              </>
                              {/*this is splitPlan*/}
                              <>
                                <div className="input-group mb-3">
                                  <div className="input-group-text">
                                    <input
                                      className="form-check-input mt-0"
                                      type="checkbox"
                                      value={list.splitPlan}
                                      name="splitPlan"
                                      id="splitPlan"
                                      onChange={handleInputChange}
                                      aria-label="Checkbox for following text input"
                                    />
                                  </div>
                                  <div
                                    type="text"
                                    className="form-control"
                                    aria-label="Text input with
                    checkbox"
                                  >
                                    Splitting expenses plan
                                  </div>
                                </div>
                              </>
                              {/*this is the empty three*/}
                              <>
                                <div className="input-group mb-3">
                                  <div className="input-group-text">
                                    <input
                                      className="form-check-input mt-0"
                                      type="checkbox"
                                      value=""
                                      name="emptyThree"
                                      id="emptyThree"
                                      onChange={handleInputChange}
                                      aria-label="Checkbox for following text input"
                                    />
                                  </div>
                                  <input
                                    type="text"
                                    className="form-control"
                                    aria-label="Text input with checkbox"
                                  />
                                </div>
                              </>
                            </div>
                          </div>
                        </div>
                      </>
                    </ul>
                  </div>
                </a>
                <a href="#" className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Our suggestion lists</h5>
                    <small className="text-muted">3 days ago</small>
                  </div>
                  <div className="mb-1">
                    <>
                      <div
                        className="accordion accordion-flush"
                        id="accordionFlushInternal"
                      >
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="f-hOne">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseOne"
                              aria-expanded="false"
                              aria-controls="flush-collapseOne"
                            >
                              A Month Before
                            </button>
                          </h2>
                          <div
                            id="flush-collapseOne"
                            className="accordion-collapse collapse"
                            aria-labelledby="f-hOne"
                            data-bs-parent="#accordionFlushInternal"
                          >
                            <div className="accordion-body">
                              List content here
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="f-hTwo">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseTwo"
                              aria-expanded="false"
                              aria-controls="flush-collapseTwo"
                            >
                              A Week Before
                            </button>
                          </h2>
                          <div
                            id="flush-collapseTwo"
                            className="accordion-collapse collapse"
                            aria-labelledby="f-hTwo"
                            data-bs-parent="#accordionFlushInternal"
                          >
                            <div className="accordion-body">
                              List content here
                            </div>
                          </div>
                        </div>

                        <div className="accordion-item">
                          <h2 className="accordion-header" id="f-hThree">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseThree"
                              aria-expanded="false"
                              aria-controls="flush-collapseThree"
                            >
                              2-3 Days Before
                            </button>
                          </h2>
                          <div
                            id="flush-collapseThree"
                            className="accordion-collapse collapse"
                            aria-labelledby="f-hThree"
                            data-bs-parent="#accordionFlushInternal"
                          >
                            <div className="accordion-body">
                              List content here
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="f-hFour">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseFour"
                              aria-expanded="false"
                              aria-controls="flush-collapseFour"
                            >
                              The Day Of
                            </button>
                          </h2>
                          <div
                            id="flush-collapseFour"
                            className="accordion-collapse collapse"
                            aria-labelledby="f-hFour"
                            data-bs-parent="#accordionFlushInternal"
                          >
                            <div className="accordion-body">
                              List content here
                            </div>
                          </div>
                        </div>
                        <div
                          className="accordion accordion-flush"
                          id="accordionFlushInternal"
                        >
                          <div className="accordion-item">
                            <h2 className="accordion-header" id="f-hFive">
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseFive"
                                aria-expanded="false"
                                aria-controls="flush-collapseFive"
                              >
                                A Day Before
                              </button>
                            </h2>
                            <div
                              id="flush-collapseFive"
                              className="accordion-collapse collapse"
                              aria-labelledby="f-hFive"
                              data-bs-parent="#accordionFlushInternal"
                            >
                              <div className="accordion-body">
                                List content here
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  </div>
                </a>
                <a href="#" className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Packing List</h5>
                    <small className="text-muted">3 days ago</small>
                  </div>
                  <div className="mb-1">
                    <>
                      <div
                        className="accordion accordion-flush"
                        id="accordionFlushInternal"
                      >
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="f-hOne">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseOne"
                              aria-expanded="false"
                              aria-controls="flush-collapseOne"
                            >
                              Travel documents
                            </button>
                          </h2>
                          <div
                            id="flush-collapseOne"
                            className="accordion-collapse collapse"
                            aria-labelledby="f-hOne"
                            data-bs-parent="#accordionFlushInternal"
                          >
                            <div className="accordion-body">
                              List content here
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="f-hTwo">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseTwo"
                              aria-expanded="false"
                              aria-controls="flush-collapseTwo"
                            >
                              Essentials
                            </button>
                          </h2>
                          <div
                            id="flush-collapseTwo"
                            className="accordion-collapse collapse"
                            aria-labelledby="f-hTwo"
                            data-bs-parent="#accordionFlushInternal"
                          >
                            <div className="accordion-body">
                              List content here
                            </div>
                          </div>
                        </div>

                        <div className="accordion-item">
                          <h2 className="accordion-header" id="f-hThree">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseThree"
                              aria-expanded="false"
                              aria-controls="flush-collapseThree"
                            >
                              Electrical Items
                            </button>
                          </h2>
                          <div
                            id="flush-collapseThree"
                            className="accordion-collapse collapse"
                            aria-labelledby="f-hThree"
                            data-bs-parent="#accordionFlushInternal"
                          >
                            <div className="accordion-body">
                              List content here
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="f-hFour">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseFour"
                              aria-expanded="false"
                              aria-controls="flush-collapseFour"
                            >
                              Clothing and shoes
                            </button>
                          </h2>
                          <div
                            id="flush-collapseFour"
                            className="accordion-collapse collapse"
                            aria-labelledby="f-hFour"
                            data-bs-parent="#accordionFlushInternal"
                          >
                            <div className="accordion-body">
                              List content here
                            </div>
                          </div>
                        </div>
                        <div
                          className="accordion accordion-flush"
                          id="accordionFlushInternal"
                        >
                          <div className="accordion-item">
                            <h2 className="accordion-header" id="f-hFive">
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseFive"
                                aria-expanded="false"
                                aria-controls="flush-collapseFive"
                              >
                                Non-essentials
                              </button>
                            </h2>
                            <div
                              id="flush-collapseFive"
                              className="accordion-collapse collapse"
                              aria-labelledby="f-hFive"
                              data-bs-parent="#accordionFlushInternal"
                            >
                              <div className="accordion-body">
                                List content here
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  </div>
                </a>
                <br />
                <button className="btn btn-primary">Save Changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

{
  /**/
}

export default TripByIdList;
