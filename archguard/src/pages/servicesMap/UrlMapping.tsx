function getPathFromUrl(url: string) {
  return url.split("?")[0];
}

function removeEndUriPlaceholder(targetUrl: string) {
  return targetUrl.slice(0, -"/@uri@".length);
}

export function urlMapping(container: any[], unMapping: any[], unusedResource: any[]) {
  let newData = [];
  let resourceMap: any = {}
  for (let service of container) {
    for (let resource of service.resources) {
      // @ts-ignore
      resourceMap[resource.sourceUrl] = service.name
    }
  }

  let demandMap: any = {}
  let mappedResource: any = {};

  function setLink(service: any, resourceName: String) {
    mappedResource[resourceName] = true;
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

  for (let service of container) {
    for (let demand of service.demands) {
      let targetUrl = getPathFromUrl(demand.targetUrl);
      let resourceName = resourceMap[targetUrl];
      // first match
      if (resourceName) {
        setLink(service, resourceName);
      } else if (targetUrl.endsWith("@uri@")) {
        // remove `/api/resource/@uri@` to as second match
        let resourceName = resourceMap[removeEndUriPlaceholder(targetUrl)];
        if (resourceName) {
          setLink(service, resourceName);
        } else {
          unMapping.push({
            service: service.name,
            originUrl: demand.originUrl,
            url: targetUrl
          })
        }
      } else {
        unMapping.push({
          service: service.name,
          originUrl: demand.originUrl,
          url: targetUrl
        })
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
