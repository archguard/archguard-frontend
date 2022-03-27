function getPathFromUrl(url: string) {
  return url.split("?")[0];
}

export function urlMapping(res: any[]) {
  let newData = [];
  let resourceMap: any = {}
  for (let service of res) {
    for (let resource of service.resources) {
      // @ts-ignore
      resourceMap[resource.sourceUrl] = service.name
    }
  }

  let demandMap: any = {}

  function setLink(service: any, resourceName: String) {
    let linkKey = JSON.stringify({
      source: service.name,
      target: resourceName,
    });
    // @ts-ignore
    if (!!demandMap[linkKey]) {
      demandMap[linkKey] += 1
    } else {
      demandMap[linkKey] = 1
    }
  }

  for (let service of res) {
    for (let demand of service.demands) {
      // @ts-ignore
      let targetUrl = getPathFromUrl(demand.targetUrl);
      let resourceName = resourceMap[targetUrl];
      // first match
      if (resourceName) {
        setLink(service, resourceName);
      } else if (targetUrl.endsWith("@uri@")) {
        // remove `/api/resource/@uri@` to as second match
        // @ts-ignore
        let resourceName = resourceMap[targetUrl.slice(0, -"/@uri@".length)];
        if (resourceName) {
          setLink(service, resourceName);
        } else {
          console.log(targetUrl)
        }
      } else {
        console.log(targetUrl)
      }
    }
  }

  for (let key in demandMap) {
    let obj = JSON.parse(key);
    obj.value = demandMap[key];
    newData.push(obj)
  }
  return newData;
}
