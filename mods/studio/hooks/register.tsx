import type { Register } from 'claude-code'

const PANE = 'studio'

// Dati da piano-studio.md (aggiornato 2026-10-16). Modificare qui quando cambiano gli appelli.
const EXAMS: { date: string; name: string; note?: string; conflict?: boolean }[] = [
  { date: '2027-01-21', name: 'Prog. OO', note: 'scritto, orale 01-28' },
  { date: '2027-01-22', name: 'Mat. Discreta / SO', note: 'da evitare', conflict: true },
  { date: '2027-01-27', name: 'ASD', note: 'scritto' },
  { date: '2027-02-01', name: 'Basi di Dati / Architettura', note: 'scegline una', conflict: true },
  { date: '2027-02-05', name: 'Mat. Discreta', note: 'secondo appello' },
  { date: '2027-02-08', name: 'Logica / esonero Prog. II', note: 'scegline una', conflict: true },
  { date: '2027-02-09', name: 'Prog. II', note: 'scritto' },
  { date: '2027-02-17', name: 'Sistemi Operativi', note: 'consigliato' },
]

const MONTHS = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic']
const daysTo = (iso: string) => Math.ceil((Date.parse(iso) - Date.now()) / 86400000)
const when = (iso: string) => `${iso.slice(8)} ${MONTHS[Number(iso.slice(5, 7)) - 1]}`
// Barra di 10 tacche: piena = esame vicino (orizzonte 120 giorni).
const bar = (d: number) => {
  const full = Math.max(0, Math.min(10, Math.round(10 - d / 12)))
  return '█'.repeat(full) + '░'.repeat(10 - full)
}
const tone = (d: number) => (d <= 30 ? 'error' : d <= 60 ? 'warning' : 'success')
const HEX = { error: '#ef4444', warning: '#f59e0b', success: '#22c55e' } as const

// Linea del tempo 15 gen - 20 feb. Colori esadecimali a tinta media: leggibili in chiaro e scuro.
const T0 = Date.parse('2027-01-15')
const T1 = Date.parse('2027-02-20')
const timeline = () => {
  const x = (iso: string) => 20 + ((Date.parse(iso) - T0) / (T1 - T0)) * 520
  const ticks = ['2027-01-15', '2027-02-01', '2027-02-15']
    .map(
      d =>
        `<line x1="${x(d)}" y1="44" x2="${x(d)}" y2="52" stroke="#8a8f98"/>` +
        `<text x="${x(d)}" y="66" font-size="10" text-anchor="middle" fill="#8a8f98">${when(d)}</text>`,
    )
    .join('')
  const dots = EXAMS.map(e => {
    const c = e.conflict ? HEX.warning : HEX[tone(daysTo(e.date))]
    const y = e.conflict ? 22 : 36
    return (
      `<g><title>${when(e.date)} · ${e.name}</title>` +
      `<line x1="${x(e.date)}" y1="${y}" x2="${x(e.date)}" y2="48" stroke="${c}" stroke-opacity=".5"/>` +
      `<circle cx="${x(e.date)}" cy="${y}" r="7" fill="${c}"/>` +
      `<text x="${x(e.date)}" y="${y + 3}" font-size="8" font-weight="700" text-anchor="middle" fill="#fff">${e.date.slice(8)}</text></g>`
    )
  }).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 76" width="560" height="76"><rect x="20" y="47" width="520" height="2" rx="1" fill="#8a8f98" fill-opacity=".4"/>${ticks}${dots}</svg>`
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'studio', description: 'Apri il pannello esami' })
    void $.ui.open({ id: PANE, title: 'Esami' })

    return next(e)
  })

  on('command.run', { command: 'studio' }, async $ => {
    await $.ui.open({ id: PANE, title: 'Esami' })

    return { text: 'Pannello esami aperto.' }
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text } = $.ui.resolve(e)
    const upcoming = EXAMS.filter(x => daysTo(x.date) >= 0)
    const first = upcoming[0]
    const web = e.surface === 'desktop'
    const Svg = web ? ($.ui.resolve(e) as { Svg: typeof Box }).Svg : undefined

    return (
      <Box flexDirection="column" padding={web ? 'md' : 0} paddingX={1} gap={web ? 'md' : 1}>
        <Box flexDirection="column" borderStyle="round" borderColor="suggestion" padding={web ? 'md' : 0} paddingX={1}>
          <Text size="caption" dimColor>SESSIONE INVERNALE 2027</Text>
          {first ? (
            <Box gap="sm" alignItems="flex-end">
              <Text size="title" weight="bold" tabular color={tone(daysTo(first.date))}>
                {daysTo(first.date)}
              </Text>
              <Text dimColor>giorni a {first.name}</Text>
            </Box>
          ) : (
            <Text dimColor>Nessun appello futuro.</Text>
          )}
          <Text size="footnote" dimColor>{upcoming.length} appelli · {upcoming.filter(x => x.conflict).length} conflitti da risolvere</Text>
        </Box>

        {Svg && <Svg source={timeline()} alt="Linea del tempo degli appelli" width={560} height={76} isInteractive />}

        <Box flexDirection="column" gap={web ? 'sm' : 0}>
          {upcoming.map(x => {
            const d = daysTo(x.date)

            return (
              <Box
                key={x.date + x.name}
                flexDirection="column"
                borderStyle={web ? 'round' : undefined}
                borderColor={x.conflict ? 'warning' : tone(d)}
                hover={web ? { borderColor: 'suggestion' } : undefined}
                paddingX={web ? 1 : 0}
              >
                <Box justifyContent="space-between">
                  <Text weight="semibold" color={x.conflict ? 'warning' : undefined}>
                    {x.conflict ? '⚠ ' : ''}
                    {x.name}
                  </Text>
                  <Text tabular weight="bold" color={tone(d)}>{d} g</Text>
                </Box>
                <Text size="footnote" dimColor>
                  {when(x.date)}
                  {x.note ? ` · ${x.note}` : ''}
                </Text>
                <Text color={tone(d)}>{bar(d)}</Text>
              </Box>
            )
          })}
        </Box>
      </Box>
    )
  })
}
