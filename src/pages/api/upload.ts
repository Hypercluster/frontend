const secretsManager = new SecretsManager({ signer, functionsRouterAddress, donId })
    await secretsManager.initialize()

const encryptedSecrets = await secretsManager.encryptSecrets({
    scopeApiKey: process.env.SCOPE_API_KEY ?? "",
    firebaseApiKey: process.env.FIREBASE_API_KEY ?? "",
  })

const { version } = await secretsManager.uploadEncryptedSecretsToDON({
            encryptedSecretsHexstring: encryptedSecrets.encryptedSecrets,
            gatewayUrls: networks[network.name]["gatewayUrls"],
            slotId,
            minutesUntilExpiration: 60,
          })
          globalVersion = version
          encryptedSecretsReference = await secretsManager.buildDONHostedEncryptedSecretsReference({
            slotId,
            version,
          })