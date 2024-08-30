import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { removeBackground } from '@imgly/background-removal-node';

export const removeBackgroundFile = async (imagePath: string): Promise<string> => {
  const outputDir = path.join(__dirname, '../output');
  const outputImagePath = path.join(outputDir, `${Date.now()}_output.png`);

  // Cria o diretório de saída se ele não existir
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    // Remove o fundo da imagem usando @imgly/background-removal-node
    const result = await removeBackground(imagePath);

    // Salva a imagem resultante no caminho de saída
    const buffer = await result.arrayBuffer();
    await sharp(Buffer.from(buffer)).toFile(outputImagePath);

    // Limpa o arquivo de entrada após o processamento
    fs.unlinkSync(imagePath);

    return outputImagePath;
  } catch (error) {
    console.error('Erro ao remover o fundo da imagem:', error);
    throw error;
  }
};