// ID DA PLANILHA DO GOOGLE SHEETS
const SHEET_ID = '1MVxyXT2jrHva-2haPzc8SHyLfTP5FS2iqwGhUl4-0DM';

// Troca de Abas
function switchTab(tabName) {
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(`tab-${tabName}`).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Busca e Atualiza os Dados
async function fetchLiveResults() {
    try {
        // 1. SEGUIDOR DE LINHA (Ordena do menor tempo para o maior)
        // 1. SEGUIDOR DE LINHA (Ordena do MENOR tempo para o MAIOR)
        const resSeguidor = await fetch(`https://opensheet.elk.sh/${SHEET_ID}/seguidor`);
        if (resSeguidor.ok) {
            const dataSeguidor = await resSeguidor.json();

            // 1. Filtra para pegar apenas linhas com equipe e tempo preenchidos
            const equipesValidas = dataSeguidor.filter(row => 
                row['Nome da Equipe:'] && 
                row['Tempo:']
            );

            // 2. Ordena do menor tempo para o maior
            equipesValidas.sort((a, b) => {
                // Converte o formato mm:ss ou hh:mm:ss em segundos para comparar corretamente
                const parseSegundos = (tempoStr) => {
                    const partes = tempoStr.split(':').map(Number);
                    if (partes.length === 3) return partes[0] * 3600 + partes[1] * 60 + partes[2];
                    if (partes.length === 2) return partes[0] * 60 + partes[1];
                    return parseFloat(tempoStr) || 0;
                };
                return parseSegundos(a['Tempo:']) - parseSegundos(b['Tempo:']);
            });

            // 3. Monta as linhas da tabela
            let htmlSeguidor = '';
            equipesValidas.forEach((row, i) => {
                const podiumClass = i === 0 ? 'podium-1' : i === 1 ? 'podium-2' : i === 2 ? 'podium-3' : '';
                htmlSeguidor += `
                    <tr class="${podiumClass}">
                        <td><strong>${i + 1}º</strong></td>
                        <td>${row['Nome da Equipe:']}</td>
                        <td>${row['Instituição de Ensino:'] || '-'}</td>
                        <td>${row['Tempo:']}</td>
                    </tr>`;
            });

            document.getElementById('seguidor-ranking').innerHTML = htmlSeguidor;
        }
        
        
                
        // 2. PROGRAMAÇÃO (Ordena da maior nota para a menor)
        // 2. PROGRAMAÇÃO (Mapeado conforme os cabeçalhos exatos da sua planilha)
        const resProg = await fetch(`https://opensheet.elk.sh/${SHEET_ID}/programacao`);
        if (resProg.ok) {
            const dataProg = await resProg.json();
    
            // 1. Filtra para remover linhas com erro #DIV/0! ou sem nome
            const alunosValidos = dataProg.filter(row => 
                row['Nome Estudante:'] && 
                row['NOTA FINAL:'] && 
                !row['NOTA FINAL:'].includes('#DIV/0!')
            );

            // 2. Ordena da MAIOR nota para a MENOR
            alunosValidos.sort((a, b) => {
                const notaA = parseFloat(a['NOTA FINAL:'].replace(',', '.'));
                const notaB = parseFloat(b['NOTA FINAL:'].replace(',', '.'));
                return notaB - notaA;
            });
    
            // 3. Monta as linhas da tabela
            let htmlProg = '';
            alunosValidos.forEach((row, i) => {
                const podiumClass = i === 0 ? 'podium-1' : i === 1 ? 'podium-2' : i === 2 ? 'podium-3' : '';
                htmlProg += `
                    <tr class="${podiumClass}">
                        <td><strong>${i + 1}º</strong></td>
                        <td>${row['Nome Estudante:']}</td>
                        <td>${row['Instituição de Ensino:'] || '-'}</td>
                        <td>${row['NOTA FINAL:']} pts</td>
                    </tr>`;
            });
    
            document.getElementById('programacao-ranking').innerHTML = htmlProg;
        }
        
        


        // 3. ROBÔ SUMÔ (Agrupado por Fases com Alinhamento Perfeito)
        const resSumo = await fetch(`https://opensheet.elk.sh/${SHEET_ID}/sumo`);
        if (resSumo.ok) {
            const dataSumo = await resSumo.json();

            // 1. Filtra apenas partidas válidas
            const lutasValidas = dataSumo.filter(match => 
                match['FASE:'] && match['Nome EQUIPE A:']
            );

            // 2. Agrupa os confrontos por Fase (ex: "16 AVOS", "OITAVAS", "QUARTAS")
            const fases = {};
            lutasValidas.forEach(match => {
                const nomeFase = match['FASE:'].trim().toUpperCase();
                if (!fases[nomeFase]) {
                    fases[nomeFase] = [];
                }
                fases[nomeFase].push(match);
            });

            let htmlSumo = '';

            // 3. Monta o HTML agrupado por fase
            for (const [fase, partidas] of Object.entries(fases)) {
                htmlSumo += `
                    <div class="phase-group">
                        <h3 class="phase-header">🏆 ${fase}</h3>
                        <div class="matches-list">`;

                partidas.forEach(match => {
                    const equipeA = match['Nome EQUIPE A:'] || '-';
                    const equipeB = match['Nome EQUIPE B:'] || '-';
                    const placarA = match['PLACAR A:'] !== undefined && match['PLACAR A:'] !== '' ? match['PLACAR A:'] : '0';
                    const placarB = match['PLACAR B:'] !== undefined && match['PLACAR B:'] !== '' ? match['PLACAR B:'] : '0';
                    const vencedor = match['Vencedor:'] || '';

                    const isTeamAWinner = vencedor && vencedor.trim().toLowerCase() === equipeA.trim().toLowerCase();
                    const isTeamBWinner = vencedor && vencedor.trim().toLowerCase() === equipeB.trim().toLowerCase();

                    htmlSumo += `
                        <div class="match-card-grid">
                            <div class="team-left ${isTeamAWinner ? 'winner-team' : ''}">
                                ${equipeA}
                            </div>
                            <div class="score-center">
                                ${placarA} x ${placarB}
                            </div>
                            <div class="team-right ${isTeamBWinner ? 'winner-team' : ''}">
                                ${equipeB}
                            </div>
                        </div>`;
                });

                htmlSumo += `
                        </div>
                    </div>`;
            }

            document.getElementById('sumo-matches').innerHTML = htmlSumo || '<p class="loading-text">Nenhum confronto cadastrado até o momento.</p>';
        }

        
        

    } catch (err) {
        console.error("Erro ao carregar os resultados:", err);
    }
}

// Executa na carga da página e atualiza a cada 15 segundos
document.addEventListener('DOMContentLoaded', () => {
    fetchLiveResults();
    setInterval(fetchLiveResults, 15000);
});