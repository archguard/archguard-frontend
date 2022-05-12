// sample: [https://jupyter-client.readthedocs.io/en/stable/kernels.html](https://jupyter-client.readthedocs.io/en/stable/kernels.html)
// {
//   "control_port": 50160,
//   "shell_port": 57503,
//   "transport": "tcp",
//   "signature_scheme": "hmac-sha256",
//   "stdin_port": 52597,
//   "hb_port": 42540,
//   "ip": "127.0.0.1",
//   "iopub_port": 40885,
//   "key": "a0436f6c-1916-498b-8eb9-e81ab9368e84"
// }
export interface JupyterConnectionInfo {
  control_port: number;
  shell_port: number;
  transport: "tcp" | "ipc";
  signature_scheme: "hmac-sha256";
  stdin_port: number;
  hb_port: number;
  ip: string;
  iopub_port: number;
  key: string;
}
