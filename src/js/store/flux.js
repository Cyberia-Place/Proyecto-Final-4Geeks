import { PostAdd } from "@material-ui/icons";
import swal from "sweetalert";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			loadSomeData: () => {
				if (localStorage.getItem("usuario")) {
					setStore({ usuario: JSON.parse(localStorage.getItem("usuario")) });
				}
			},

			signUp: async (email, contrasenia, nombre) => {
				let myHeaders = new Headers();
				myHeaders.append("content-type", "application/json");
				let options = {
					headers: myHeaders,
					body: JSON.stringify({ email, contrasenia, nombre }),
					method: "POST"
				};

				try {
					let response = await fetch(process.env.BACK_URL + "/signup", options);
					let data = await response.json();

					if (data.message) {
						getActions().showMessage("Error!", data.message, "error");
					} else {
						getActions().showMessage("Registro exitoso!", "Usuario registrado exitosamente", "success");
					}
				} catch (error) {
					getActions().showMessage("Error!", "Error en el servidor", "error");
				}
			},
			logIn: async (email, contrasenia) => {
				let myHeaders = new Headers();
				myHeaders.append("content-type", "application/json");
				let options = {
					headers: myHeaders,
					body: JSON.stringify({ email, contrasenia }),
					method: "POST"
				};

				try {
					let response = await fetch(process.env.BACK_URL + "/login", options);
					let data = await response.json();

					if (data.message) {
						getActions().showMessage("Error!", data.message, "error");
					} else {
						localStorage.setItem("usuario", JSON.stringify(data.usuario));
						localStorage.setItem("token", data.token);
						localStorage.setItem("expires", data.expires);

						setStore({ usuario: data.usuario });

						getActions().showMessage("Login exitoso!", "Usuario logeado exitosamente", "success");
					}
				} catch (error) {
					getActions().showMessage("Error!", "Error en el servidor", "error");
				}
			},

			showMessage: (title, text, icon) => {
				swal({ title, text, icon, button: false });
			}
		}
	};
};

export default getState;
