import React from "react";
import ServicesMapMapping from "@/pages/servicesMap/ServicesMapMapping";

function ServicesMap() {
  return (<div>
    <p>说明：前端当前支持 Axios、UMI-Request，后端支持 Java/Kotlin + Spring、C# + .Net</p>
    <p>新的语言和框架支持，请移步：<a href="https://github.com/archguard/scanner" target={"_blank"}>https://github.com/archguard/scanner</a></p>
    <ServicesMapMapping />
  </div>)
}

export default ServicesMap;
