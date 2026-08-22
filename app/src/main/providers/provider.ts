import type {
  ChatMessage,
  CompletionChunk,
  ListModelsResult,
  ModelInfo,
  TestConnectionResult
} from '../../shared/types'
export interface Provider {
  listModels(): Promise<ListModelsResult>
  testConnection(modelId: string): Promise<TestConnectionResult>
  getCompletion(modelId: string, messages: ChatMessage[]): Promise<string>
  streamCompletion(
    modelId: string,
    messages: ChatMessage[],
    onChunk: (chunk: Omit<CompletionChunk, 'streamId'>) => void,
    signal?: AbortSignal
  ): Promise<void>
}

/** Convenience: build a {@link ModelInfo} from an id, deriving a display name. */
export function modelInfo(id: string, name?: string): ModelInfo {
  return { id, name: name && name.trim() ? name : id }
}
