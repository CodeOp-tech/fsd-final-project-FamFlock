/* utils.js: useful utilities */
// source: Jim's MapsAndGeo Demo

/**
 * Given a long address, replace all ', ' with '<br />'.
 * Return it in a "dangerous" <span> so React won't escape the <br /> tags.
 */

function breakAddr(addr) {
  let addrWithBrs = addr.replace(/, /g, "<br />");
  //let addrWithBrs = addr;
  // console.log(addrWithBrs);
  return <span dangerouslySetInnerHTML={{ __html: addrWithBrs }}></span>;
  //return <span dangerouslySetInnerHTML={{ __html: addr }}></span>;
}

export { breakAddr };
