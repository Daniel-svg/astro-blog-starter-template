export async function get({ url }) {
  const domain = url.searchParams.get("domain");
  if (!domain) {
    return new Response(JSON.stringify({ error: "缺少 domain 參數" }), { status: 400 });
  }

  const CF_DOH = "https://cloudflare-dns.com/dns-query";

  async function dns(type) {
    const res = await fetch(`${CF_DOH}?name=${domain}&type=${type}`, {
      headers: { accept: "application/dns-json" }
    });
    const json = await res.json();
    return json.Answer ? json.Answer.map(a => a.data).join(", ") : null;
  }

  const A = await dns("A");
  const AAAA = await dns("AAAA");
  const NS = await dns("NS");
  const MX = await dns("MX");

  // Domain 可用性：SOA 查不到 = 可能未註冊
  const SOA = await dns("SOA");
  const available = !SOA;

  return new Response(
    JSON.stringify({
      domain,
      available,
      A,
      AAAA,
      NS,
      MX
    }),
    {
      headers: { "content-type": "application/json" }
    }
  );
}
