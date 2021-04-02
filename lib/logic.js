/**
 * Drug transaction
 * @param {org.example.biznet.Certify} certify
 * @transaction
 */
 async function DrugTransaction(certify) {
  certify.certificate.issuer = certify.issuer;
      return getAssetRegistry("org.example.biznet.Certificate")
        .then(assetRegistry => {
          return assetRegistry.update(certify.certificate); 
        })
        .then(() => {
          let event = getFactory().newEvent(
            "org.example.biznet",
            "IssuingNotification"
          );
          event.certificate = certify.certificate;
          emit(event);
        });
}