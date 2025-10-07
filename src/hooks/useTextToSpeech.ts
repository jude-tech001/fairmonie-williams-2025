
import { useCallback, useRef } from 'react';

export const useTextToSpeech = () => {
  const hasUserInteracted = useRef(false);
  const isInitialized = useRef(false);
  const isSpeaking = useRef(false);
  const hasAutoInitialized = useRef(false);
  const audioContext = useRef<AudioContext | null>(null);

  // Enhanced AudioContext initialization for maximum deployment compatibility
  const initializeAudioContext = useCallback(() => {
    if (!audioContext.current) {
      try {
        // Universal AudioContext support with enhanced fallbacks for deployment
        const AudioContextClass = window.AudioContext || 
                                  (window as any).webkitAudioContext || 
                                  (window as any).mozAudioContext || 
                                  (window as any).msAudioContext ||
                                  (window as any).AudioContext;
        
        if (AudioContextClass) {
          // Enhanced constructor with deployment-safe settings
          try {
            audioContext.current = new AudioContextClass({
              latencyHint: 'interactive',
              sampleRate: 44100 // Standard rate for all deployment environments
            });
          } catch (constructorError) {
            // Fallback to basic constructor for deployment compatibility
            audioContext.current = new AudioContextClass();
          }
          
          // Enhanced iOS/iPhone and Vercel deployment fixes
          const forceResume = async () => {
            if (audioContext.current && audioContext.current.state === 'suspended') {
              try {
                // Multiple resume strategies for deployment environments
                await audioContext.current.resume();
                
                // Additional resume verification for deployment
                let attempts = 0;
                while (audioContext.current.state === 'suspended' && attempts < 5) {
                  await new Promise(resolve => setTimeout(resolve, 100));
                  await audioContext.current.resume();
                  attempts++;
                }
                
                // Create a silent buffer to unlock audio on all platforms
                const buffer = audioContext.current.createBuffer(1, 1, 22050);
                const source = audioContext.current.createBufferSource();
                const gainNode = audioContext.current.createGain();
                
                gainNode.gain.setValueAtTime(0, audioContext.current.currentTime);
                source.buffer = buffer;
                source.connect(gainNode);
                gainNode.connect(audioContext.current.destination);
                source.start(0);
                
                console.log('AudioContext successfully initialized for deployment environment');
              } catch (e) {
                console.log('AudioContext resume attempt (deployment):', e);
                
                // Alternative resume method for deployment
                try {
                  const oscillator = audioContext.current!.createOscillator();
                  const gainNode = audioContext.current!.createGain();
                  gainNode.gain.setValueAtTime(0, audioContext.current!.currentTime);
                  oscillator.connect(gainNode).connect(audioContext.current!.destination);
                  oscillator.start();
                  oscillator.stop(audioContext.current!.currentTime + 0.01);
                } catch (altError) {
                  console.log('Alternative audio unlock failed:', altError);
                }
              }
            }
          };
          
          // Progressive resume attempts for deployment reliability
          const resumeSchedule = [0, 50, 100, 200, 300, 500, 750, 1000, 1500, 2000, 3000];
          resumeSchedule.forEach(delay => {
            setTimeout(forceResume, delay);
          });
          
          // Set up event listeners for deployment environments
          audioContext.current.onstatechange = () => {
            console.log(`AudioContext state: ${audioContext.current?.state}`);
            if (audioContext.current?.state === 'suspended') {
              // Automatic resume attempt for deployment
              setTimeout(() => {
                if (audioContext.current?.state === 'suspended') {
                  audioContext.current.resume().catch(e => 
                    console.log('Auto-resume failed:', e)
                  );
                }
              }, 100);
            }
          };
          
          // Enhanced user interaction detection for deployment
          const setupUserInteractionHandlers = () => {
            const events = ['touchstart', 'touchend', 'mousedown', 'mouseup', 'click', 'keydown'];
            const handler = () => {
              if (audioContext.current?.state === 'suspended') {
                audioContext.current.resume().catch(e => 
                  console.log('User interaction resume failed:', e)
                );
              }
              // Remove handlers after first interaction
              events.forEach(event => {
                document.removeEventListener(event, handler, true);
              });
            };
            
            events.forEach(event => {
              document.addEventListener(event, handler, { capture: true, once: true });
            });
          };
          
          setupUserInteractionHandlers();
        }
      } catch (error) {
        console.log('AudioContext initialization failed (deployment):', error);
      }
    }
  }, []);

  // Enhanced audio success sound generator with deployment compatibility
  const playSuccessSound = useCallback(async (type: 'withdrawal' | 'bonus') => {
    initializeAudioContext();
    
    if (!audioContext.current) {
      console.log('AudioContext not available for sound playback');
      return;
    }
    
    try {
      const ctx = audioContext.current;
      
      // Enhanced resume for deployment environments
      if (ctx.state === 'suspended') {
        try {
          await ctx.resume();
          
          // Verify resume for deployment
          let resumeAttempts = 0;
          while (ctx.state === 'suspended' && resumeAttempts < 3) {
            await new Promise(resolve => setTimeout(resolve, 100));
            await ctx.resume();
            resumeAttempts++;
          }
          
          if (ctx.state === 'suspended') {
            console.log('AudioContext remains suspended for sound playback');
            return;
          }
        } catch (resumeError) {
          console.log('Failed to resume AudioContext for sound:', resumeError);
          return;
        }
      }
      
      if (type === 'withdrawal') {
        // Enhanced withdrawal success sound for deployment
        const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        let currentTime = ctx.currentTime;
        
        frequencies.forEach((freq, index) => {
          try {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, currentTime);
            
            // Enhanced gain envelope for deployment clarity
            gain.gain.setValueAtTime(0, currentTime);
            gain.gain.linearRampToValueAtTime(0.4, currentTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.35);
            
            osc.start(currentTime);
            osc.stop(currentTime + 0.35);
            
            // Enhanced cleanup for deployment
            osc.onended = () => {
              try {
                osc.disconnect();
                gain.disconnect();
              } catch (e) {
                // Ignore disconnect errors
              }
            };
            
            currentTime += 0.2;
          } catch (noteError) {
            console.log(`Error playing withdrawal note ${index}:`, noteError);
          }
        });
        
      } else if (type === 'bonus') {
        // Enhanced bonus claim sound for deployment
        const melody = [
          { freq: 523.25, duration: 0.18, gain: 0.35 }, // C5
          { freq: 659.25, duration: 0.18, gain: 0.4 },  // E5
          { freq: 783.99, duration: 0.18, gain: 0.35 }, // G5
          { freq: 1046.50, duration: 0.18, gain: 0.4 }, // C6
          { freq: 1318.51, duration: 0.28, gain: 0.45 }, // E6
          { freq: 1567.98, duration: 0.45, gain: 0.5 }   // G6
        ];
        
        let currentTime = ctx.currentTime;
        
        melody.forEach((note, index) => {
          try {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(note.freq, currentTime);
            
            // Enhanced gain envelope for deployment clarity
            gain.gain.setValueAtTime(0, currentTime);
            gain.gain.linearRampToValueAtTime(note.gain, currentTime + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, currentTime + note.duration);
            
            osc.start(currentTime);
            osc.stop(currentTime + note.duration);
            
            // Enhanced cleanup for deployment
            osc.onended = () => {
              try {
                osc.disconnect();
                gain.disconnect();
              } catch (e) {
                // Ignore disconnect errors
              }
            };
            
            currentTime += note.duration * 0.75;
          } catch (noteError) {
            console.log(`Error playing bonus note ${index}:`, noteError);
          }
        });
      }
      
      console.log(`${type} success sound played successfully for deployment`);
      
    } catch (error) {
      console.log('Sound generation error (deployment):', error);
      
      // Fallback beep sound for deployment environments
      try {
        if (audioContext.current && audioContext.current.state === 'running') {
          const osc = audioContext.current.createOscillator();
          const gain = audioContext.current.createGain();
          
          osc.frequency.setValueAtTime(800, audioContext.current.currentTime);
          osc.type = 'sine';
          
          gain.gain.setValueAtTime(0, audioContext.current.currentTime);
          gain.gain.linearRampToValueAtTime(0.3, audioContext.current.currentTime + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, audioContext.current.currentTime + 0.2);
          
          osc.connect(gain);
          gain.connect(audioContext.current.destination);
          
          osc.start(audioContext.current.currentTime);
          osc.stop(audioContext.current.currentTime + 0.2);
        }
      } catch (fallbackError) {
        console.log('Fallback sound failed for deployment:', fallbackError);
      }
    }
  }, [initializeAudioContext]);

  const speak = useCallback((text: string) => {
    if (!text || text.trim() === '') return;
    
    if (!('speechSynthesis' in window)) {
      console.log('Speech synthesis not supported');
      return;
    }

    // Force audio context initialization for deployment compatibility
    initializeAudioContext();
    
    // User interaction detection for deployment
    const handleUserInteraction = () => {
      hasUserInteracted.current = true;
      if (audioContext.current && audioContext.current.state === 'suspended') {
        audioContext.current.resume();
      }
    };
    
    // Auto-detect user interaction
    if (!hasUserInteracted.current) {
      document.addEventListener('click', handleUserInteraction, { once: true });
      document.addEventListener('touchstart', handleUserInteraction, { once: true });
      document.addEventListener('keydown', handleUserInteraction, { once: true });
    }

    // Auto-initialize on first speak call for deployment compatibility
    if (!hasAutoInitialized.current) {
      hasAutoInitialized.current = true;
      enableSpeech();
    }

    // Prevent multiple simultaneous speech attempts
    if (isSpeaking.current) {
      window.speechSynthesis.cancel();
      isSpeaking.current = false;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Small delay to ensure cancellation completes
    setTimeout(() => {
      isSpeaking.current = true;
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Enhanced properties for deployment compatibility
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      utterance.volume = 0.9;
      
      // Event handlers
      utterance.onstart = () => {
        console.log('Speech started');
      };
      
      utterance.onend = () => {
        isSpeaking.current = false;
        console.log('Speech ended');
      };
      
      utterance.onerror = (event) => {
        console.log('Speech error:', event);
        isSpeaking.current = false;
      };
      
      // Enhanced function for deployment compatibility
      const performSpeak = () => {
        try {
          // Force initialization for all browsers/devices and deployment environments
          if (!isInitialized.current) {
            // Multiple wake-up attempts for maximum compatibility
            for (let i = 0; i < 3; i++) {
              const wakeUpUtterance = new SpeechSynthesisUtterance(' ');
              wakeUpUtterance.volume = 0;
              wakeUpUtterance.rate = 10;
              window.speechSynthesis.speak(wakeUpUtterance);
            }
            
            // Small delay then cancel to ensure initialization
            setTimeout(() => {
              window.speechSynthesis.cancel();
            }, 50);
            
            isInitialized.current = true;
          }

          // Universal deployment fix for all platforms
          const universalSpeak = () => {
            // Force resume if paused (iOS/Android/deployment fix)
            if (window.speechSynthesis.paused) {
              window.speechSynthesis.resume();
            }
            
            // Start speaking
            window.speechSynthesis.speak(utterance);
            
            // Aggressive deployment fixes for all environments
            const monitorSpeech = () => {
              const checkSpeechStatus = () => {
                if (isSpeaking.current) {
                  // Force resume if paused
                  if (window.speechSynthesis.paused) {
                    window.speechSynthesis.resume();
                  }
                  
                  // Re-speak if stopped unexpectedly (common in deployment)
                  if (!window.speechSynthesis.speaking && !window.speechSynthesis.pending) {
                    try {
                      window.speechSynthesis.speak(utterance);
                    } catch (e) {
                      console.log('Re-speak failed:', e);
                    }
                  }
                }
              };
              
              // Multiple check intervals for reliability
              setTimeout(checkSpeechStatus, 100);
              setTimeout(checkSpeechStatus, 300);
              setTimeout(checkSpeechStatus, 600);
              setTimeout(checkSpeechStatus, 1000);
              setTimeout(checkSpeechStatus, 2000);
            };
            
            monitorSpeech();
          };

          // Immediate execution with retry fallback
          universalSpeak();
          
          // Backup retry after delay
          setTimeout(() => {
            if (isSpeaking.current && !window.speechSynthesis.speaking) {
              console.log('Backup retry triggered');
              universalSpeak();
            }
          }, 500);
          
        } catch (error) {
          console.log('Speech error:', error);
          isSpeaking.current = false;
        }
      };

      // Try to set voice if available
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        // Find best English voice
        const englishVoice = voices.find(voice => 
          voice.lang.startsWith('en') && 
          (voice.name.includes('Google') || voice.name.includes('Microsoft') || 
           voice.name.includes('Samantha') || voice.name.includes('Alex') || voice.default)
        ) || voices.find(voice => voice.lang.startsWith('en')) || voices[0];
        
        if (englishVoice) {
          utterance.voice = englishVoice;
        }
        
        performSpeak();
      } else {
        // Wait for voices with enhanced timeout handling
        let voiceTimeout: NodeJS.Timeout;
        let hasHandled = false;
        
        const handleVoicesLoaded = () => {
          if (hasHandled) return;
          hasHandled = true;
          
          clearTimeout(voiceTimeout);
          const newVoices = window.speechSynthesis.getVoices();
          
          if (newVoices.length > 0) {
            const englishVoice = newVoices.find(voice => 
              voice.lang.startsWith('en')
            ) || newVoices[0];
            
            if (englishVoice) {
              utterance.voice = englishVoice;
            }
          }
          
          performSpeak();
        };
        
        // Listen for voices loaded event
        window.speechSynthesis.addEventListener('voiceschanged', handleVoicesLoaded, { once: true });
        
        // Fallback timeout - speak anyway
        voiceTimeout = setTimeout(() => {
          if (!hasHandled) {
            hasHandled = true;
            console.log('Voice timeout - speaking without voice selection');
            performSpeak();
          }
        }, 1500);
      }
    }, 100);
  }, [initializeAudioContext]);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      isSpeaking.current = false;
    }
  }, []);

  // Enhanced speech initialization for deployment
  const enableSpeech = useCallback(() => {
    if ('speechSynthesis' in window) {
      hasUserInteracted.current = true;
      initializeAudioContext();
      
      // Enhanced deployment initialization for all platforms
      if (!isInitialized.current) {
        try {
          // Multi-step initialization for maximum compatibility
          const initializeForAllPlatforms = async () => {
            // Step 1: Resume AudioContext if needed
            if (audioContext.current && audioContext.current.state === 'suspended') {
              await audioContext.current.resume();
            }
            
            // Step 2: Wake up the Speech API with silent utterances
            for (let i = 0; i < 3; i++) {
              const wakeUp = new SpeechSynthesisUtterance(' ');
              wakeUp.volume = 0;
              wakeUp.rate = 10;
              window.speechSynthesis.speak(wakeUp);
              
              setTimeout(() => {
                window.speechSynthesis.cancel();
              }, 20);
            }
            
            // Step 3: Force voice loading if needed
            const voices = window.speechSynthesis.getVoices();
            if (voices.length === 0) {
              // Enhanced voice loading with multiple attempts
              const voiceLoadPromise = new Promise((resolve) => {
                let attemptCount = 0;
                const maxAttempts = 5;
                
                const attemptVoiceLoad = () => {
                  attemptCount++;
                  const currentVoices = window.speechSynthesis.getVoices();
                  
                  if (currentVoices.length > 0 || attemptCount >= maxAttempts) {
                    resolve(true);
                    return;
                  }
                  
                  // Try to trigger voice loading
                  const triggerUtterance = new SpeechSynthesisUtterance(' ');
                  triggerUtterance.volume = 0;
                  window.speechSynthesis.speak(triggerUtterance);
                  window.speechSynthesis.cancel();
                  
                  setTimeout(attemptVoiceLoad, 200);
                };
                
                const handleVoicesChanged = () => {
                  window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
                  resolve(true);
                };
                
                window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
                attemptVoiceLoad();
                
                // Ultimate fallback
                setTimeout(() => {
                  window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
                  resolve(true);
                }, 5000);
              });
              
              await voiceLoadPromise;
            }
            
            // Step 4: Final cleanup
            if (window.speechSynthesis.speaking) {
              window.speechSynthesis.cancel();
            }
            
            console.log('Enhanced speech synthesis initialized for deployment');
          };
          
          initializeForAllPlatforms();
          isInitialized.current = true;
          
        } catch (error) {
          console.log('Speech initialization error:', error);
          isInitialized.current = true;
        }
      }
    }
  }, [initializeAudioContext]);

  return { speak, stopSpeaking, enableSpeech, playSuccessSound };
};
