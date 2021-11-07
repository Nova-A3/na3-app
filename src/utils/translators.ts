import type { Falsy } from "utility-types";

export function translateId(id: Falsy | string): string {
  return id
    ? {
        corretiva: "Corretiva",
        eletrica: "Elétrica",
        high: "Alta",
        low: "Baixa",
        machineAdjustment: "Ajuste de máquina",
        maintainerChanged: "Responsável redefinido",
        mecanica: "Mecânica",
        medium: "Média",
        poke: "Setor cutucado",
        predial: "Predial",
        preditiva: "Preditiva",
        preventiva: "Preventiva",
        priorityChanged: "Prioridade redefinida",
        solutionAccepted: "Solução aceita",
        solutionRefused: "Solução recusada",
        solutionStepAdded: "Progresso",
        solutionTransmitted: "Solução transmitida",
        ticketClosed: "OS encerrada",
        ticketConfirmed: "OS confirmada",
        ticketCreated: "OS criada",
        ticketEdited: "OS editada",
        ticketReopened: "OS reaberta",
      }[id] || id
    : "";
}
