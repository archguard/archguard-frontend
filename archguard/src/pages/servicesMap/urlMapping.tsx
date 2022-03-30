function getPathFromUrl(url: string) {
  return url.split("?")[0];
}

function removeUriSuffixAndPrefix(targetUrl: string) {
  let url = targetUrl.slice(0, -"/@uri@".length);
  if (url.startsWith("@uri@/")) {
    url.slice("@uri@".length)
  }
  return url;
}

export function urlMapping(container: any[], unMapping: any[], elements: { nodes: any[], edges: any[] }) {
  let linkData = [];
  let resourceMap: any = {}
  for (let service of container) {
    elements.nodes.push({
      id: service.name,
      language: service.language,
      'service.name': service.name,
    })

    for (let resource of service.resources) {
      // @ts-ignore
      resourceMap[resource.sourceUrl] = service.name
    }
  }

  let demandMap: any = {}
  function setLink(service: any, resourceName: String) {
    let linkKey = JSON.stringify({
      id: `${service.name}~${resourceName}`,
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
        let fixedUrl = removeUriSuffixAndPrefix(targetUrl);
        let resourceName = resourceMap[fixedUrl];
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
    linkData.push(obj)
  }

  console.log(linkData)

  elements.edges = linkData
  return linkData;
}
