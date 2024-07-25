const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();

// Handle incoming messages
    playerManager.setMessageInterceptor(
      cast.framework.messages.MessageType.LOAD,
      request => {
        if (request.media && request.media.customData) {
			const customDataStr = JSON.stringify(request.media.customData);
			debug("CustomData: " + customDataStr);

			const customData = JSON.parse(customDataStr);
			debug("CustomData obj: " + JSON.stringify(customData));
			debug("...PARSED...");

			if(customData.debug) {
				showDebug();
			}

			if(customData.verse) {
				document.getElementById('verse').textContent = customData.verse;
			}

			if(customData.source) {
				document.getElementById('source').textContent = customData.source;
			}

			if(customData.size) {
				setSize(customData.size);
			}

			debug("...DONE");

			fadeToVerse();
			//displayVerseElement();
        }
      }
    );

context.start();