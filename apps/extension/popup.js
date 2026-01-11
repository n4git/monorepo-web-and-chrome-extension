const DEFAULT_BASE_URL = 'http://localhost:3000'

function $(id) {
  return document.getElementById(id)
}

function formatTime(iso) {
  try {
    const d = new Date(iso)
    return d.toLocaleString()
  } catch {
    return iso
  }
}

async function getBaseUrl() {
  const data = await chrome.storage.sync.get({ baseUrl: DEFAULT_BASE_URL })
  return data.baseUrl || DEFAULT_BASE_URL
}

async function setBaseUrl(baseUrl) {
  await chrome.storage.sync.set({ baseUrl })
}

async function fetchUsers(baseUrl) {
  const url = baseUrl.replace(/\/$/, '') + '/api/users'
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Request failed (${res.status}): ${text.slice(0, 120)}`)
  }
  const json = await res.json()
  return json.users || []
}

function renderUsers(users) {
  const list = $('list')
  list.innerHTML = ''

  if (!users.length) {
    const p = document.createElement('p')
    p.className = 'muted'
    p.textContent = 'No users returned.'
    list.appendChild(p)
    return
  }

  for (const u of users) {
    const row = document.createElement('div')
    row.className = 'item'

    const img = document.createElement('img')
    img.className = 'avatar'
    img.src = u.image
    img.alt = u.name
    img.referrerPolicy = 'no-referrer'

    const meta = document.createElement('div')
    meta.className = 'meta'

    const name = document.createElement('p')
    name.className = 'name'
    name.textContent = u.name

    const email = document.createElement('p')
    email.className = 'email'
    email.textContent = u.email

    meta.appendChild(name)
    meta.appendChild(email)

    const time = document.createElement('div')
    time.className = 'time'
    time.textContent = formatTime(u.createdAt)

    row.appendChild(img)
    row.appendChild(meta)
    row.appendChild(time)

    list.appendChild(row)
  }
}

async function refresh() {
  const status = $('status')
  status.classList.remove('error')
  status.textContent = 'Loading...'

  try {
    const baseUrl = await getBaseUrl()
    $('baseUrl').value = baseUrl
    const users = await fetchUsers(baseUrl)
    renderUsers(users)
    status.textContent = `OK — fetched ${users.length} users from ${baseUrl}`
  } catch (e) {
    console.error(e)
    status.classList.add('error')
    status.textContent = `Error: ${e?.message || String(e)}`
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  $('save').addEventListener('click', async () => {
    const val = $('baseUrl').value.trim() || DEFAULT_BASE_URL
    await setBaseUrl(val)
    await refresh()
  })

  $('refresh').addEventListener('click', refresh)

  await refresh()
})
