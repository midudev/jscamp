process.loadEnvFile() // es cargar las variables de entorno del .env

import { test } from 'node:test'
import assert from 'node:assert'

import { Stagehand } from '@browserbasehq/stagehand'

test('Un usuario puede entrar a la JSConf y adquirir dos entradas por €287.98', async () => {
  const stagehand = new Stagehand({
    env: 'LOCAL',
    model: 'openai/gpt-5-mini'
  })

  const agent = stagehand.agent({
    mode: "cua",
    model: {
      modelName: "openai/computer-use-preview",
      apiKey: process.env.OPENAI_API_KEY
    },
    systemPrompt: "Eres un agente de testing e2e para navegar páginas y hacer las acciones que te pedimos",
});

  await stagehand.init()

  const [page] = stagehand.context.pages()

  await page.goto('https://jsconf.es')

  const result = await agent.execute("add two tickets 'Entrada' to the cart for the JSConf event and extract the subtotal amount displayed in the cart.")

  console.log(result)

  // Lo quiero que haga
  // await stagehand.act('Click to "Comprar Entradas"')

  // await stagehand.act('Add one "Entrada General" ticket to the cart')
  // await stagehand.act('Add another one "Entrada General" ticket to the cart')

  // // Extraer la información
  // const { extraction } = await stagehand.extract("Extract the subtotal from the page.")
  // console.log('Subtotal extraído:', extraction)

  // assert.strictEqual(extraction, '€287.98')

  await stagehand.close()
})