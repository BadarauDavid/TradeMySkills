import axios, { AxiosError } from "axios";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import { useIsAuthenticated } from "react-auth-kit";
import DefaultURL from "../GlobalVariables";

export default function ChangePassword({ email }) {
  const isAuthenticated = useIsAuthenticated();

  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertInfos, setAlertInfos] = useState(["", ""]);
  const [userInfos, setUserInfos] = useState("");
  const [active, setActive] = useState(false);

  const actualPassword = useRef();
  const newPassword = useRef();
  const confirmNewPassword = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        if (isAuthenticated) {
          const response = await axios.get(
            `${DefaultURL}/users/email/${email}`
          );
          const data = response.data;
          setUserInfos(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchCurrentUser();
  }, []);

  const unlockSaveButton = () => {
    const newPassFieldValue = newPassword.current.value;
    const confirmPassFieldVaue = confirmNewPassword.current.value;

    setActive(
      newPassFieldValue === confirmPassFieldVaue && newPassFieldValue.length > 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPasswordForm = formData.get("newPassword");

    try {
      if (!isAuthenticated()) {
        await axios.put(
          `http://localhost:8080/users/set-password?email=${email}`,
          {},
          {
            headers: {
              newPassword: newPasswordForm,
            },
          }
        );
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        await axios.put(
          `http://localhost:8080/users/${userInfos?.id}/change-password`,
          {
            actualPassword: actualPassword.current.value,
            newPassword: newPassword.current.value,
          }
        );
        setTimeout(() => {
          navigate("/myprofile");
        }, 3000);
      }
      setShowAlert(true);
      setAlertInfos(["success", "Password successfully changed!"]);
    } catch (err) {
      if (err instanceof AxiosError) setError(err.response?.data.message);
      else if (err instanceof Error) setError(err.message);
      setShowAlert(true);
      setAlertInfos([
        "danger",
        "Fields incorrectly completed! Try again carefully!",
      ]);
    }
  };

  return (
    <>
      {showAlert && <Alert type={alertInfos[0]} message={alertInfos[1]} />}
      <form onSubmit={handleSubmit} style={{ marginTop: 175 }}>
        <div className="container py-3 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong">
                <div className="card-body p-5 text-center">
                  <h1 className="mb-3">Change Password</h1>
                  {isAuthenticated() ? (
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        className="form-control"
                        id="actualPassword"
                        name="actualPassword"
                        ref={actualPassword}
                        placeholder="Actual Password"
                      />
                    </div>
                  ) : null}
                  <div className="form-outline mb-4">
                    <input
                      onChange={() => unlockSaveButton()}
                      type="password"
                      className="form-control"
                      id="newPassword"
                      name="newPassword"
                      ref={newPassword}
                      placeholder="New Passoword"
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      onChange={() => unlockSaveButton()}
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      ref={confirmNewPassword}
                      placeholder="Confirm New Passoword"
                    />
                  </div>
                  {active === true ? (
                    <button
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                    >
                      Save
                    </button>
                  ) : (
                    <div>
                      <div
                        id="Title-Help"
                        className="form-text"
                        style={{ color: "#fa6900" }}
                      >
                        *The Confirmation Password should be the same as the New
                        Password!
                      </div>

                      <button
                        className="btn btn-primary btn-lg btn-block mt-3"
                        type="submit"
                        disabled
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
