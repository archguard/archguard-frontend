import React from "react";
import FileEditor from "@/pages/interactiveAnalysis/coreEditor/FileEditor";
import crypto from "crypto";
import jmp from "jmp";

function InteractiveAnalysis() {
  var scheme = "sha256";
  var key = crypto.randomBytes(256).toString('base64');

  var serverSocket = new jmp.Socket("router", scheme, key);
  var clientSocket = new jmp.Socket("dealer", scheme, key);

  var address = "tcp://127.0.0.1:57503";

  serverSocket.bindSync(address);
  clientSocket.connect(address);

  return (<div>
    <FileEditor />
  </div>)
}

export default InteractiveAnalysis;
