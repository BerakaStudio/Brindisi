import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react'

const ShareButton = forwardRef(({ recipe }, ref) => {
  const [showMenu, setShowMenu] = useState(false)
  const [copied, setCopied] = useState(false)
  const menuRef = useRef(null)

  useImperativeHandle(ref, () => ({
    openMenu: () => setShowMenu(true),
    closeMenu: () => setShowMenu(false)
  }))

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false)
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])

  const shareUrl = `${window.location.origin}/#/coctel/${recipe.slug}`
  const shareText = `${recipe.name} - ${recipe.description}`

  const handleCopyRecipe = async () => {
    try {
      const ingredientsData = await import('../data/ingredients.json')
      const characteristicsData = await import('../data/characteristics.json')

      const baseIngredient = ingredientsData.default.find(i => i.id === recipe.baseIngredient)
      const characteristics = recipe.characteristics.map(charId => {
        const char = characteristicsData.default.find(c => c.id === charId)
        return char ? char.label : charId
      })

      const recipeText = `🍸 ${recipe.name}

"${recipe.description}"

📋 INFORMACIÓN
• Ingrediente base: ${baseIngredient?.icon || '🥃'} ${baseIngredient?.label || recipe.baseIngredient}
• Características: ${characteristics.join(', ')}
• Porciones: ${recipe.servings} ${recipe.servings > 1 ? 'personas' : 'persona'}

📝 INGREDIENTES
${recipe.ingredients.map((ing, i) => `${i + 1}. ${ing.charAt(0).toUpperCase() + ing.slice(1)}`).join('\n')}

👨‍🍳 PREPARACIÓN
${recipe.preparation.map((step, i) => `${i + 1}. ${step}`).join('\n')}

🍹 Receta desde Brindisi`

      await navigator.clipboard.writeText(recipeText)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
        setShowMenu(false)
      }, 1500)
    } catch (err) {
      console.error('Error al copiar:', err)
    }
  }

  const handleShare = async (platform) => {
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedText = encodeURIComponent(shareText)

    let url = ''

    switch(platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodedText}%20${encodedUrl}`
        break
      case 'telegram':
        url = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`
        break
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
        break
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case 'native':
        if (navigator.share) {
          try {
            await navigator.share({
              title: recipe.name,
              text: shareText,
              url: shareUrl
            })
          } catch (err) {
            console.log('Cancelado')
          }
        }
        setShowMenu(false)
        return
      default:
        return
    }

    window.open(url, '_blank', 'noopener,noreferrer')
    setShowMenu(false)
  }

  const shareOptions = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      ),
      action: () => handleShare('whatsapp')
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.098.155.23.171.324.016.093.036.306.02.472z"/>
        </svg>
      ),
      action: () => handleShare('telegram')
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      action: () => handleShare('twitter')
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      action: () => handleShare('facebook')
    },
    {
      id: 'copy-recipe',
      name: copied ? '¡Copiado!' : 'Copiar receta',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      action: handleCopyRecipe
    }
  ]

  // Agregar compartir nativo si está disponible
  if (navigator.share) {
    shareOptions.splice(4, 0, {
      id: 'native',
      name: 'Compartir...',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      ),
      action: () => handleShare('native')
    })
  }

  if (!showMenu) return null

  return (
    <div
      ref={menuRef}
      className="absolute top-full right-0 mt-2 z-50 bg-white dark:bg-dark-800 rounded-lg shadow-2xl border border-emerald-200 dark:border-dark-700 py-1 min-w-[180px] animate-fadeIn"
    >
      {shareOptions.map(option => (
        <button
          key={option.id}
          onClick={option.action}
          className="w-full px-3 py-2 hover:bg-emerald-50 dark:hover:bg-dark-700 transition-colors text-left flex items-center gap-2.5 text-sm"
          disabled={copied && option.id === 'copy-recipe'}
        >
          <span className="text-emerald-600 dark:text-emerald-400">
            {option.icon}
          </span>
          <span className="text-gray-900 dark:text-white font-medium">
            {option.name}
          </span>
        </button>
      ))}
    </div>
  )
})

ShareButton.displayName = 'ShareButton'

export default ShareButton